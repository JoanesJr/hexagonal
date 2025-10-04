export interface IReader<T> {
    findById(id: string): Promise<T>;
    findByAll(): Promise<T[]>;
    findByField(field: string, value: unknown): Promise<T[]>;
}