export class MenuItem {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public restaurantId: string
    ) {}
}