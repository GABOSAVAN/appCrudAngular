import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://fakestoreapi.com/products';
  private localStorageKey = 'products';
  private productsLocal: Product[] = [];
  private productsUpdated = new Subject<Product[]>(); 
  dataLoaded: boolean = false; // Bandera para controlar si los datos ya se han cargado

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  loadsProducts() {
    if (!this.productsLocal.length) { // Verificar si los datos ya se han cargado
      this.getProducts().subscribe(products => {
        this.productsLocal = products;
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
      });
    }
  }

  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable(); 
  }

  getLocalProducts(): Product[] {
    const productsJson = localStorage.getItem(this.localStorageKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  getProductById(productId: number): Observable<Product | null> {
    const product = this.productsLocal.find(item => item.id == productId);
    return of(product || null);
  }

  saveLocalProducts() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.productsLocal));
  }

  saveProduct(product: Product): void {
    if (product.id) {
      const index = this.productsLocal.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.productsLocal[index] = { ...product };
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
        this.navigateToProducts();
        alert(`${product.title} ha sido actualizado`);
      }
    } else {
      let newId = this.generateUniqueId();
      while (this.productsLocal.some(p => p.id === newId)) {
        newId = this.generateUniqueId();
      }
      product.id = newId;
      this.productsLocal.push({ ...product });
      this.saveLocalProducts();
      this.productsUpdated.next([...this.productsLocal]);
      this.navigateToProducts();
      alert('Producto guardado exitosamente');
    }
  }

  private generateUniqueId(): number {
    const maxId = this.productsLocal.length > 0 ? Math.max(...this.productsLocal.map(p => p.id || 0)) : 0;
    return maxId + 1;
  }

  deleteProduct(productToDelete: Product) {
    const isConfirmed = window.confirm(`¿Está seguro de querer eliminar el producto "${productToDelete.title}"?`);
    if (isConfirmed) {
      const index = this.productsLocal.findIndex(product => product.id === productToDelete.id);
      if (index !== -1) {
        this.productsLocal.splice(index, 1);
        this.saveLocalProducts();
        this.productsUpdated.next([...this.productsLocal]);
      } else {
        alert('Product not found!');
      }
    } else {
      alert('Product deletion canceled!');
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToProductDetail() {
    this.router.navigate(['/product-detail']);
  }

  navigateToFormProduct() {
    this.router.navigate(['/form-product']);
  }

  resetDataFromEndpoint(): void {
    this.dataLoaded = false; // Marcar como no cargada la data
    this.loadsProducts(); // Cargar productos desde el endpoint
  }
}
