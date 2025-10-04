export interface IWriter<S, U, R> {
    save(data: S): Promise<R>;
    update(id: string, data: U): Promise<R>;
    delete(id: string): Promise<R>;
}