import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product, Category } from '../../models/product';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  product: Product = {};
  categories: Category[] = Object.values(Category);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.productService.getProductById(productId).subscribe((data: Product | null) => {
          if (data) {
            this.product = data;
          } else {
            alert("Producto no existe")// Manejar el caso en el que no se encuentre el producto
          }
        });
      }
    });
  }

  saveProduct(): void {
    this.productService.saveProduct(this.product);
    this.clearForm();
    this.navigateToProducts();
  }

  clearForm(): void {
    this.product = {};
  }

  cancel(): void {
    this.clearForm();
    this.navigateToProducts();
  }

  navigateToProducts() {
    this.productService.navigateToProducts();
  }

}
