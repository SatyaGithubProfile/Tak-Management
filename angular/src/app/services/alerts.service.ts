import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  successAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }


  errorAlert(message:string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }


}
