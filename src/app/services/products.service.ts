import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
  };

  loadsProducts(){
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

  saveLocalProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
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

}
