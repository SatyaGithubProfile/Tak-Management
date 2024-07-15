export class Cart {
    CustomerId : number;
    ProductID : number;
    Quantity : number;
    NetPrice : number;
    Discount : number;
    TotalPrice : number;

    constructor( CustomerId : number, ProductId : number, Quantity : number, NetPrice : number, Discount : number, TotalPrice : number,
    ){
        this.CustomerId = CustomerId;
        this.ProductID = ProductId;
        this.Quantity = Quantity;
        this.NetPrice = NetPrice;
        this.Discount = Discount;
        this.TotalPrice = TotalPrice;
    }
}