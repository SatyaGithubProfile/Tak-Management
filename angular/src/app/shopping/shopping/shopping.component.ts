import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem('shopping', 'true');
  }

}
