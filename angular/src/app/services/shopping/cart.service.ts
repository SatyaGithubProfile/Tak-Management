import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { Cart } from '../../models/shopping/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addToCart(data:Cart) {
    return this.http.post<Cart>(Environment.swaggerUrl + 'cart', data)
  }
}
