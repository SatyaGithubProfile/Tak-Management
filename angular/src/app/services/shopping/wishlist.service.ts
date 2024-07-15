import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { response } from '../../models/shopping/customers';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  customerId: number = 10012; // need to make this customer Id from localStorage

  addToWishlist(productId: number) {
    const data = {
      CustomerId: this.customerId,
      ProductIDs: "" + productId
    }
    return this.http.post(Environment.swaggerUrl + 'wishlist', data);
  }

  getList() {
    return this.http.get<response>(Environment.swaggerUrl + `wishlist?customerId=${this.customerId}`);
  }

  removeProduct(id: number) {
    return this.http.delete<response>(Environment.swaggerUrl + `wishlist?productId=${id}&customerId=${this.customerId}`)
  }

}
