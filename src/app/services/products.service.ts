import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://fakestoreapi.com/products';
  private loginApi = "http://localhost:3000/login"; 
  private localStorageKey = 'products';
  private productsLocal: Product[] = [];
  private productsUpdated = new Subject<Product[]>(); 
  dataLoaded: boolean = false; // Bandera para controlar si los datos ya se han cargado
  productForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      id: [], // Agregar campo id al FormGroup, no es requerido
      title: ['', [Validators.required]], // Campo title requerido
      description: ['', [Validators.required]], // Campo description requerido
      category: ['', [Validators.required]], // Campo category requerido
      price: ['', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]], // Campo price requerido y debe ser un número
      image: [''] // Campo image no requerido
    });
   }

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
        //console.log("paso 1")
        this.saveLocalProducts();
        //console.log("paso 2")
        this.productsUpdated.next([...this.productsLocal]);
        //console.log("paso 3")
        this.navigateToProducts();
        //console.log("paso 4")
        this.clearForm();
        setTimeout(()=>
          {
          //console.log("paso 5")
          alert(`${product.title} ha sido actualizado`);
           
        }
        )
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
      this.clearForm();
      setTimeout(()=>{
        alert('Producto guardado exitosamente')
      })
      ;
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

  restart(){
    console.log('Restarting from endpoint in product services');
    return this.http.get<any>(this.loginApi);
  }

  clearForm(): void {
    this.productForm.reset(); // Resetear el formulario utilizando reset()
  }
}
