import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { MaterialModule } from'src/app/material';
import { ProductsService } from 'src/app/services/products.service';
import { transformacionAnimacion } from '../../animations/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  animations: [transformacionAnimacion]
})
export class ProductDetailComponent implements OnInit {

  public product?: Product | null | undefined;
  constructor(private router: Router,
              private _route: ActivatedRoute,
              private productsService: ProductsService) { }
        
  ngOnInit(): void {
    this.setData();
  }

  setData(): void{
    this._route.params.subscribe(params => {
      this.productsService.getProductById(params['id']).subscribe((data: Product | null) => {
        this.product = data;
        console.log(this.product)
      })
    });
   }

  navigateToProducts() {
    this.productsService.navigateToProducts();
  }
}
