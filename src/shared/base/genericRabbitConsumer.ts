import { connectRabbitMQ } from '@/infra/queue/rabbitConnection';
import { MissingFieldError } from '../errors/MissingField.error';

export enum OPERATIONS_TYPE {
    CREATE,
    UPDATE,
    DELETE,
}
export interface IRabbitConsumer {
    queue: string;
    schema?: any;
    useCase: any;
    context: string;
    type: OPERATIONS_TYPE;
}
export abstract class GenericConsumer<T> {
    private queue: string;
    private schema: any;
    private useCase: any;
    private context: typeof this.useCase;
    private type: OPERATIONS_TYPE
    constructor(config: IRabbitConsumer) {
        this.queue = config.queue;
        this.schema = config.schema;
        this.useCase = config.useCase;
        this.context = config.context;
        this.type = config.type;
    }
    async start() {
        const channel = await connectRabbitMQ();
        const queue = this.queue;
        await channel.assertQueue(queue, { durable: true });
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    const { id = '' } = content;
                    let parsed;
                    if (this.type == OPERATIONS_TYPE.DELETE) {
                        parsed = {
                            content,
                            success: true
                        };
                    } else {
                        parsed = this.schema.safeParse(content);
                    }

                    if (!parsed.success) {
                        console.error(`Invalid message payload - [${this.context}]`, parsed.error.format());
                        channel.nack(msg, false, false);
                        return;
                    }
                    let dataRes: T;
                    if (this.type == OPERATIONS_TYPE.CREATE) {
                        dataRes = await this.useCase.execute(parsed.data);
                    }
                    if (this.type == OPERATIONS_TYPE.UPDATE) {
                        if (!id) {
                            throw new MissingFieldError('id');
                        }
                        dataRes = await this.useCase.execute(id, parsed.data);
                    }
                    if (this.type == OPERATIONS_TYPE.DELETE) {
                        if (!id) {
                            throw new MissingFieldError('id');
                        }
                        dataRes = await this.useCase.execute(id);
                    }

                    console.info(`success - [${this.context}]`, dataRes);

                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error processing message - ${this.context}`, error);
                    channel.nack(msg, false, false);
                }
            }
        });
    }
}