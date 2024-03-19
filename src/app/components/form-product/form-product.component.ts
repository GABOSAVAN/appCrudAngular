import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent {
  constructor(private router: Router) { }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToProductDetail() {
    this.router.navigate(['/product-detail']);
  }
}
