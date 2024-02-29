import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customers } from '../../models/shopping/customers';
import { CustomersService } from '../../services/shopping/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  display: string = 'none';


  constructor(private formBuilder: FormBuilder, private customerServ: CustomersService) {

  }

  customersForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    pincode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
  });


  onSubmit() {
    // console.log('the customers response-->', this.customersForm.value);
    const value = this.customersForm.value;
    const customer = new Customers(value.firstName, value.lastName, value.email, value.password, value.mobileNumber, value.pincode, value.address);
    console.log('here is the update customer details --->', customer);
    this.customerServ.addCustomers(customer).subscribe((result) => {
      console.log('Success---', result);
      this.onCloseModal();
    },
      (error) => {
        console.log('adding error', error)
      })

  }

  onOpenModal() {
    this.display = 'block'
  }

  onCloseModal() {
    this.display = 'none'
  }

}
