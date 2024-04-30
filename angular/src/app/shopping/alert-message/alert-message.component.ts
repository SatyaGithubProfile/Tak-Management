import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent implements OnInit {

  message: string = ''
  showErrorPopup = false;
  errorStatus = '';
  settimeout: NodeJS.Timeout | undefined;
  constructor(private alertServ: AlertsService) { }
  ngOnInit(): void {
     this.alertServ.alertMessage$.pipe(skip(1)).subscribe((result) => {
      clearTimeout(this.settimeout);
      this.clearError();
      setTimeout(() => {
        this.showError(result.message);
      }, 100);
      this.errorStatus = result.status ? 'alert alert-success' : 'alert alert-danger';
    })
  }

  showError(message: string) {
    this.showErrorPopup = true;
    this.message = message;
    this.settimeout = setTimeout(() => {
      this.clearError();
    }, 2000);  
  }

  clearError() {
    this.showErrorPopup = false;
  }

}
