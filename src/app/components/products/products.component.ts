import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { MaterialModule } from '../../material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { fadeInOut, transformacionAnimacion } from '../../animations/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [fadeInOut, transformacionAnimacion]
})
export class ProductsComponent implements OnInit {

  products: Product[] = []; // Lista de productos obtenidos del localStorage
  productsSubscription!: Subscription;
  selectedProduct: Product | null = null;
  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    console.log("products desde el componente",this.products)
    this.productsService.loadsProducts();
    this.products = this.productsService.getLocalProducts();
    this.productsSubscription = this.productsService.getProductsUpdatedListener()
      .subscribe((updatedProducts: Product[]) => {
        this.products = updatedProducts;
      });
  }
  
  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  deleteProduct(productToDelete: Product) {
    this.productsService.deleteProduct(productToDelete);
    this.products = this.productsService.getLocalProducts();
  }  
  
  navigateToFormProduct() {
    this.router.navigate(['/form-product']);
  }  navegate(id: number): void {
    this.router.navigate(['/products', id]);
  }

  togglehide(product: Product){    
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
}
