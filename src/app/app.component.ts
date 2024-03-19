import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appCrud';

  constructor(public productsService: ProductsService, private router: Router,) { }

  restart(){
    this.productsService.restart();
  }

  navigateToFormProduct() {
    this.productsService.navigateToFormProduct();
  }

}
