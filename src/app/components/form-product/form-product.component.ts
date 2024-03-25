import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product, Category } from '../../models/product';
import { transformacionAnimacion } from '../../animations/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar Validators y FormBuilder

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
  animations: [transformacionAnimacion]
})
export class FormProductComponent implements OnInit {

  product: Product = {};
  categories: Category[] = Object.values(Category);
  productForm: FormGroup; // Definir la variable productForm como FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private formBuilder: FormBuilder // Agregar FormBuilder al constructor
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

  ngOnInit(): void {
    // Obtener el producto si se está editando
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.productService.getProductById(productId).subscribe((data: Product | null) => {
          if (data) {
            this.productForm.patchValue(data); // Rellenar el formulario con los datos del producto
          } else {
            alert("Producto no existe"); // Manejar el caso en el que no se encuentre el producto
          }
        });
      }
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) { // Verificar si el formulario es válido
      const productData = this.productForm.value; // Obtener los datos del formulario
      this.productService.saveProduct(productData);
      this.clearForm();
      this.navigateToProducts();
    } else {
      alert('Por favor complete el formulario correctamente.'); // Mostrar alerta si el formulario no es válido
    }
  }

  clearForm(): void {
    this.productForm.reset(); // Resetear el formulario utilizando reset()
  }

  cancel(): void {
    this.clearForm();
    this.navigateToProducts();
  }

  navigateToProducts() {
    this.productService.navigateToProducts();
  }

}
