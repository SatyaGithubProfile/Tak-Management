import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { Customers } from '../../models/shopping/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http : HttpClient) { }


  addCustomers(data : Customers) {
    return this.http.post(Environment.swaggerUrl+'customers', data)
  }

}
