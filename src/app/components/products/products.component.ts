import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { fadeInOut, transformacionAnimacion } from '../../animations/animations';
import { MaterialModule } from '../../material'; // Importación de MaterialModule

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [fadeInOut, transformacionAnimacion]
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productsSubscription!: Subscription;
  selectedProduct: Product | null = null;
  dataLoaded: boolean = false; // Bandera para controlar si los datos ya se han cargado

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.dataLoaded) { // Verificar si los datos ya han sido cargados
      this.loadData();
    } else {
      this.products = this.productsService.getLocalProducts(); // Obtener los productos del localStorage
    }
  }

  loadData() {
    this.productsService.loadsProducts();
    this.products = this.productsService.getLocalProducts();
    this.productsSubscription = this.productsService.getProductsUpdatedListener()
      .subscribe((updatedProducts: Product[]) => {
        this.products = updatedProducts;
        this.dataLoaded = true; // Establecer la bandera en true cuando los datos se carguen
      });
  }
  
  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  deleteProduct(productToDelete: Product) {
    this.productsService.deleteProduct(productToDelete);
    this.products = this.productsService.getLocalProducts();
  }  
  
  navigateToFormProduct() {
    this.router.navigate(['/form-product']);
  }

  navigate(id: number): void {
    this.router.navigate(['/products', id]);
  }

  toggleHide(product: Product) {    
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
}
