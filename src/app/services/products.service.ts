import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, Subject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
//import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://fakestoreapi.com/products';
  private localStorageKey = 'products';
  products: Product[] = [];
  productsLocal: Product[] = [];
  showForm = false; // Bandera para mostrar/ocultar el formulario de actualización
  selectedProduct: Product | null = null; // Producto seleccionado para actualizar
  private productsUpdated = new Subject<Product[]>(); // Subject para notificar actualizaciones

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
  };

  loadsProducts(){  
    console.log("products desde el servicio",this.products)
    console.log("productsLocal desde el servicio",this.productsLocal)
    this.getProducts().subscribe(products => {
    this.products = products;
    this.saveLocalProducts()
    });
    this.productsLocal = this.getLocalProducts();
    this.productsUpdated.next([...this.products]);
  }

  restart(){
     this.loadsProducts();
     this.productsUpdated.next([...this.products]);
     console.log('Restarting...');
  
};

  getProductsUpdatedListener() {
    return this.productsUpdated.asObservable(); // Observable para suscribirse a actualizaciones
  }

  getLocalProducts(): Product[] {
    const productsJson = localStorage.getItem(this.localStorageKey);
    return productsJson ? JSON.parse(productsJson) : [];
  };

  getProductById(productId: number): Observable<Product | null> {
    console.log("que llega??????   ",typeof productId)
    const productsStr = localStorage.getItem('products');
    const products: Product[] = productsStr ? JSON.parse(productsStr) : [];
    const product = products.find(item => item.id == productId);
    return of(product || null);
  };

  saveLocalProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  saveProduct(product: Product): void {
    if (product.id) {
      const index = this.productsLocal.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.productsLocal[index] = { ...product };
        localStorage.setItem('products', JSON.stringify(this.productsLocal));
        this.products = this.productsLocal;
        alert(`${product.title} ha sido actualizado`);
        console.log("products desde el servicio save 1",this.products)
      }
    } else {
      product.id = this.productsLocal.length + 1;
      this.productsLocal.push({ ...product });
      localStorage.setItem('products', JSON.stringify(this.productsLocal));
      this.products = this.productsLocal;
      alert('Producto guardado exitosamente');
      console.log("products desde el servicio save 2",this.products)
    }
  }

  deleteProduct(productToDelete: Product) {
    // Mostrar el cuadro de diálogo de confirmación
    const isConfirmed = window.confirm(`¿Está seguro de querer eliminar el producto "${productToDelete.title}"?`);

    // Verificar si el usuario confirmó la eliminación
    if (isConfirmed) {
        // Encuentra el índice del producto a eliminar en productsLocal
        const index = this.productsLocal.findIndex(product => product.id === productToDelete.id);
        console.log('este es el index',index);
        // Verifica si se encontró el producto
        if (index !== -1) {
            // Elimina el producto del array productsLocal
            this.productsLocal.splice(index, 1);
            // Actualiza el localStorage con los productos actualizados
            localStorage.setItem('products', JSON.stringify(this.productsLocal));
            // Actualiza la lista de productos
            this.products = this.productsLocal;
            console.log("products desde el servicio delete",this.products)
            
        } else {
            alert('Product not found!');
        }
    } else {
        // Si el usuario cancela, no se realiza ninguna acción
        alert('Product deletion canceled!');
    }
}

showUpdateForm(product: Product) {
  this.showForm = true;
  this.selectedProduct = { ...product }; 
  console.log(this.showForm);
  // Copia el producto seleccionado para actualizarlo
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
}
