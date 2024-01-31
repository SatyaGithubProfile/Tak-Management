import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  @Input() hideFeature: boolean = false;
  totalRecords: number = 0;
  pageCount: number[] = [];
  currentPage: number = 1;
  @Input() limit: number = 5;
  limitValue = [5,10,20]

  constructor(private alertServ: AlertsService) {
  }

  ngOnInit(): void {
    this.alertServ.resetPagination$.subscribe(() => this.resetPagination());
    this.alertServ.totalRecordsShare.subscribe((res) => {
      this.pageCount = [];
      this.totalRecords = 0;
      this.totalRecords = res.totalRecords;
      const count = Math.round(res.totalRecords / this.limit) || 1;
      this.limit = res.limit;
      Array(count).fill(count).map((x) => this.pageCount.push(x));
    });
    this.alertServ.limitChange$.pipe(skip(1)).subscribe((res) => this.limit = res);
  }


  pageChanged(page: number, move: string) {
    if (move === 'N' && this.currentPage == this.pageCount[0]) return;
    if (move === 'P' && this.currentPage == 1) return;
    this.currentPage = page;
    this.alertServ.pageChange$.next(page);
  }

  changeLimit(event:Event) {
    this.resetPagination();
    this.limit = +(event.target as HTMLInputElement).value;
    this.alertServ.limitChange$.next(this.limit);
   }

  resetPagination() {
    this.totalRecords = 0;
    this.pageCount= [];
    this.currentPage = 1;
    this.limit= 5;
  }

}
