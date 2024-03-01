import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../environment';
import { Customers, response } from '../../models/shopping/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http : HttpClient) { }

  getCustomers() {
    return this.http.get<response>(Environment.swaggerUrl+'customers');
  }

  addCustomers(data : Customers) {
    return this.http.post(Environment.swaggerUrl+'customers', data)
  }

  updateCustomer (data:Customers) {
    return this.http.put<response>(Environment.swaggerUrl+'customers', data);
  }

}
