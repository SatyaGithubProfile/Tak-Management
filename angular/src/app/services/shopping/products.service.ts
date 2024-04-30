import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { response } from '../../models/shopping/customers';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../models/shopping/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  constructor(private http:HttpClient) { }


  getAllProducts() {
    return this.http.get<response>(Environment.swaggerUrl + 'products');
  }

  addProdcut(data : Products) {
    console.log('at service level---->',data)
    return this.http.post<response>(Environment.swaggerUrl + 'products', data);
  }
}
