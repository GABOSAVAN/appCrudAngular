import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { MaterialModule } from '../../material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []; // Lista de productos obtenidos del localStorage
  showForm = false; // Bandera para mostrar/ocultar el formulario de actualización
  productsSubscription!: Subscription;


  constructor(private productsService: ProductsService,
              private router: Router) { }

              ngOnInit() {
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
              
              showUpdateForm(product: Product) {
                this.productsService.showUpdateForm(product);
              }
            
              deleteProduct(productToDelete: Product) {
                this.productsService.deleteProduct(productToDelete);
                this.products = this.productsService.getLocalProducts();
            }
            
            navigateToProductDetail() {
              this.router.navigate(['/product-detail']);
            }
            
            navigateToFormProduct() {
              this.router.navigate(['/form-product']);
            }
}
