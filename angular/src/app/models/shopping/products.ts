export class Products {
    ProductID !: number;
    ProductName: string;
    Price: number;
    Discount: number;
    ImageURL: string;
    Description: string;
    Category: string;
    Stock: number;
    CartQuantity : number = 0;
    WishList : string = 'FALSE'
    // ButtonStatus : boolean = true;

    constructor(ProductName: string, Price: number, Discount: number, ImageURL: string, Description: string, Category: string, Stock: number) {
            this.ProductName = ProductName;
            this.Price = Price;
            this.Discount = Discount;
            this.ImageURL = ImageURL
            this.Description = Description;
            this.Category = Category;
            this.Stock = Stock;
    }
}