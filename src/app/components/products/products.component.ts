import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private router: Router) { }

  navigateToProductDetail() {
    this.router.navigate(['/product-detail']);
  }

  navigateToFormProduct() {
    this.router.navigate(['/form-product']);
  }
}
