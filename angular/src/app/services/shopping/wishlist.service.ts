import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  customerId: number = 100; // need to make this customer Id from localStorage

  addToWishlist(productId : number) {
    const data = {
      CustomerId : this.customerId,
      ProductIDs : ""+productId
    }
    return this.http.post(Environment.swaggerUrl + 'wishlist', data );
  }

}
