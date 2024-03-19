import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appCrud';

  constructor(public productsService: ProductsService) { }

  restart(){
    this.productsService.restart();
  }

}
