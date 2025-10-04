import { NotFoundError } from "@/shared/errors/NotFound.error";
import { IMenuItemReader } from "../ports/IMenuItemReader";
import { IMenuItemWriter } from "../ports/IMenuItemWriter";

export class RemoveMenuItemUseCase {
    constructor(private readonly menuItemReader: IMenuItemReader, private readonly menuItemWriter: IMenuItemWriter) {}
    async execute(id: string) {
        const existsItem = await this.menuItemReader.findById(id);
        if (!existsItem) {
            throw new NotFoundError(RemoveMenuItemUseCase.name);
        }
        const deleted = await this.menuItemWriter.delete(id);
        return deleted;
    }
}