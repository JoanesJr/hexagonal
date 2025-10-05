import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { IMenuItemWriter } from "../ports/IMenuItemWriter";
import { ILoggerService } from "@/infra/logger/loggerService";

export class RemoveMenuItemUseCase {
    constructor(private readonly menuItemReader: IMenuItemReader, private readonly menuItemWriter: IMenuItemWriter, private readonly logger: ILoggerService) {}
    async execute(id: string) {
        const existsItem = await this.menuItemReader.findById(id);
        if (!existsItem) {
            this.logger.error(`${RemoveMenuItemUseCase.name} - NotFoundError`, {id});
            throw new NotFoundError(RemoveMenuItemUseCase.name);
        }
        const deleted = await this.menuItemWriter.delete(id);
        this.logger.info(`${RemoveMenuItemUseCase.name} - success`, {id});
        return deleted;
    }
}