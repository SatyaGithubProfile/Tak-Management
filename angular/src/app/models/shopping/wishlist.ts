export class Wishlist {

    ProductID !: number;
    ProductName: string = '';
    Price: number = 0;
    Discount: number = 0;
    ImageURL: string = '';
    Description: string = '';
    Category: string = '';
    Stock: number = 0;


    constructor(
        ProductID: number,
        ProductName: string,
        Price: number,
        Discount: number,
        ImageURL: string,
        Description: string,
        Category: string,
        Stock: number,
    ) {
        this.ProductID = ProductID;
        this.ProductName = ProductName;
        this.Price = Price;
        this.Discount = Discount;
        this.ImageURL = ImageURL;
        this.Description = Description;
        this.Category = Category;
        this.Stock = Stock;
    }

}

export interface response {
    status: number;
    message: string;
    data: any;
    count: number;
}