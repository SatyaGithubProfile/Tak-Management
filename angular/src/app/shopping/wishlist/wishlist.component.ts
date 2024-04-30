import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/shopping/wishlist.service';
import { error } from 'console';
import { response } from '../../models/shopping/customers';
import { Wishlist } from '../../models/shopping/wishlist';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  constructor(private wishlistServ : WishlistService, private alertServ:AlertsService){}
  listOfProducts !: Wishlist[];
  
  ngOnInit(): void {
   this.getList();
  }

  getList() {
    this.wishlistServ.getList().subscribe(
      (result)=> {
        this.listOfProducts = result.data;
        console.log('wishlist products=---->', this.listOfProducts)
      },
      (error) => {
        console.log('error in wishlist--->', error);
      }
    )
  }

  removeWishlist(productId : number) {
    const index = this.listOfProducts.findIndex(obj => obj.ProductID === productId);
    this.wishlistServ.removeProduct(productId).subscribe((result) =>{ 
      this.listOfProducts.splice(index, 1);
      this.alertServ.alertMessage$.next({message : 'Successfully, Removed the prodduct', status : true})
    },
    (error) => {
      this.alertServ.alertMessage$.next({message : 'Error! While removing the items!', status : false})
    }
  )
  }

}
