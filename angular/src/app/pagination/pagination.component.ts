import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  limit: number = 5;

  constructor(private alertServ: AlertsService) {
  }

  ngOnInit(): void {
    this.alertServ.resetPagination$.subscribe(() => this.resetPagination());
    this.alertServ.totalRecordsShare.subscribe((res) => {
      this.pageCount = [];
      this.totalRecords = 0;
      this.totalRecords = res.totalRecords;
      const count = Math.round(res.totalRecords / this.limit);
      this.limit = res.limit;
      Array(count).fill(count).map((x) => this.pageCount.push(x));
    });
    this.alertServ.limitChange$.pipe(skip(1)).subscribe((res) => this.limit = res);
  }


  pageChanged(page: number, move: string) {
    console.log('page--->', page)
    if (move === 'N' && this.currentPage == this.pageCount[0]) return;
    if (move === 'P' && this.currentPage == 1) return;
    this.currentPage = page;
    this.alertServ.pageChange$.next(page);
  }

  resetPagination() {
    this.totalRecords = 0;
    this.pageCount= [];
    this.currentPage = 1;
    this.limit= 5;
  }

}
