export class AlreadyExistsError extends Error {
    constructor(entity: string) {
        super();
        this.message = `Data already exists in ${entity}`
       
    }
}