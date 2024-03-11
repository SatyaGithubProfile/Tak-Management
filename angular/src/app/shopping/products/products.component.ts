import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
import { Products } from '../../models/shopping/products';
import { ProductsService } from '../../services/shopping/products.service';
import { response } from '../../models/shopping/customers';
import { Cart } from '../../models/shopping/cart';
import { CartService } from '../../services/shopping/cart.service';
import { WishlistService } from '../../services/shopping/wishlist.service';
import { error } from 'console';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  allProducts: Products[] = [];

  constructor(private alertServ: AlertsService, private productServ: ProductsService,
    private cartServ: CartService, private wishlistServ: WishlistService) {
    this.alertServ.paginationHide$.next(true);
  }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productServ.getAllProducts().subscribe(
      (result: response) => {
        this.allProducts = result.data;
      },
      (error) => {
        console.log('get all products --->', error.message)
      }
    )
  }

  addToCart(productId: number, count: number, status: number) {
    count = status === 1 ? count + 1 : count - 1;
    const index = this.allProducts.findIndex(p => p.ProductID === productId);
    let product: Products = this.allProducts[index];
    this.allProducts[index].CartQuantity = count;
    console.log('product --->', product)
    // CustomerId : number, ProductId : number, Quantity : number, NetPrice : number, Discount : number, TotalPrice : number,
    if (product !== undefined) {
      const totalPrice = count * product?.Price * (product?.Discount / 100);
      let cart = new Cart(100, product?.ProductID, count, product?.Price, product?.Discount, totalPrice);
      this.cartServ.addToCart(cart).subscribe(
        (result) => {
          console.log('added to cart product-->', productId, ' Count -->', count);
          const msg = status === 1 ? 'Successfully added to cart...' : 'Removed the item from cart...';
          this.productServ.alertMessage$.next({ message: msg, status: status === 1 ? true : false })
        },
        (error) => {
          console.log('Error while adding to cart-->', error);
          this.productServ.alertMessage$.next({ message: 'Error while updating cart items...Try again...', status: false })
        }
      )
      console.log('cart value---', cart);
    }
  }


  addToWishlist(productId: number) {
    const index = this.allProducts.findIndex(p => p.ProductID === productId);
    let product: Products = this.allProducts[index];
    this.allProducts[index].WishList = this.allProducts[index].WishList !== "TRUE" ? "TRUE" : "FALSE";
    this.wishlistServ.addToWishlist(productId).subscribe(
      (result) => {
        console.log('success result -->', result);
        const message = this.allProducts[index].WishList === "TRUE" ? 'Successfully. Added item to wishlist...' : 'Removed item from wishlist...';
        this.productServ.alertMessage$.next({ message: message, status: this.allProducts[index].WishList === "TRUE" ? true : false })
      },
      (error) => {
        this.productServ.alertMessage$.next({ message: 'Error while updating wishlist... Try Again...', status: false })
      }
    );

  }


}

