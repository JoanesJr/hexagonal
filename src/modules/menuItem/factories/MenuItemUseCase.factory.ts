import { PrismaMenuItemRepository } from "../adapters/outbound/prisma/PrismaMenuItem.repository";

export class MenuItemUseCaseFactory {
    static createUseCases() {
        const repo = new PrismaMenuItemRepository();
        return {
            
        }
    }
}