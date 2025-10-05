import { env } from '@/shared/config/env';
import amqplib, { Connection, Channel } from 'amqplib';

let channel: Channel;

export async function connectRabbitMQ(): Promise<Channel> {
  if (channel) return channel;

  const connection: Connection = await amqplib.connect(env.RABBIT_URL);
  channel = await connection.createChannel();
  return channel;
}
