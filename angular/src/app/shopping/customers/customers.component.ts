import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customers, response } from '../../models/shopping/customers';
import { CustomersService } from '../../services/shopping/customers.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  display: string = 'none';
  customerList: Customers[] = [];
  
  constructor(private formBuilder: FormBuilder, private customerServ: CustomersService, private alertServ : AlertsService) {  }

  customersForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    pincode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
    address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
  });

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerServ.getCustomers().subscribe((result: response ) => {
      this.customerList = result.data;
    },
    (error) => {
      console.log('while gettting the CUstomers ERROR--->',error)
    })
  }

   // To update the role
   roleChange(change: boolean, id: number) {
    const index = this.customerList.findIndex(x => x.CustomerId === id);
    this.customerList[index].IsAdmin = !change;
    this.customerServ.updateCustomer(this.customerList[index]).subscribe(
      (result) => {
        this.alertServ.successAlert();
      },
      (error) => {
        this.customerList[index].IsAdmin = change;
      }
    )
  }

  onSubmit() {
    const value = this.customersForm.value;
    const customer = new Customers(value.firstName, value.lastName, value.email, value.password, value.mobileNumber, value.pincode, value.address);
    this.customerServ.addCustomers(customer).subscribe((result) => {
      this.onCloseModal();
    },
      (error) => {
        console.log('adding error', error)
      })

  }

  onDelete(id : number) {
    const index = this.customerList.findIndex(x => x.CustomerId === id);
    this.customerServ.deleteCustomer(id).subscribe(
      (success) => { 
        this.alertServ.successAlert();
        this.customerList.splice(index, 1);
      },
      (error) => {
        this.alertServ.errorAlert(error.message);
      }
    )
  }

  onOpenModal() {
    this.display = 'block'
  }

  onCloseModal() {
    this.display = 'none'
  }

}
