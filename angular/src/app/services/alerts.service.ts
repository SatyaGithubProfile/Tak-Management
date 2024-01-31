import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  pageChange$ = new BehaviorSubject<number>(1);  // To get the page number 
  limitChange$ = new BehaviorSubject<number>(5);  // limit per page 
  @Output() totalRecordsShare = new EventEmitter<{totalRecords:number, limit:number}>(); // to share the records and limit count
  resetPagination$ = new Subject();
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
