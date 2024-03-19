import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  constructor(private router: Router) { }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToFormProduct() {
    this.router.navigate(['/form-product']);
  }
}
