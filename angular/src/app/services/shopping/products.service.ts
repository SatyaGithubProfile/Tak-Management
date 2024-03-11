import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { response } from '../../models/shopping/customers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  alertMessage$  = new BehaviorSubject<{message : string, status : boolean}>({message : '', status : true});
  constructor(private http:HttpClient) { }


  getAllProducts() {
    return this.http.get<response>(Environment.swaggerUrl + 'products');
  }
}
