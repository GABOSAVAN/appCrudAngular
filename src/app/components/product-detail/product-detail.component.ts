import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { transformacionAnimacion } from '../../animations/animations';
import { MaterialModule } from 'src/app/material'; // Importación de MaterialModule

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  animations: [transformacionAnimacion]
})
export class ProductDetailComponent implements OnInit {

  public product?: Product | null | undefined;
  
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private productsService: ProductsService
  ) { }
        
  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this._route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.productsService.getProductById(productId).subscribe((data: Product | null) => {
          if (data) {
            this.product = data;
          } else {
            console.log('Producto no encontrado');
          }
        });
      }
    });
  }

  navigateToProducts() {
    this.productsService.navigateToProducts();
  }
}
