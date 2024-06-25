import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/utils/api.service';

interface Product {
  stock: number;
  description: string;
  price: number;
  id: number;
  category_id: number;
}

interface Category {
  id: number;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('addProductModal') addProductModal!: ElementRef;

  products: Product[] = [];
  categories: Category[] = [];
  newProduct = { name: '', description: '', stock: 0, price: 0, categoryId: 0 };
  baseUrl: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.baseUrl = this.apiService.getBaseUrl();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.http.get<Product[]>(`${this.baseUrl}/product/find-all`).subscribe(
      data => this.products = data,
      error => console.error(error)
    );
  }

  loadCategories() {

    this.http.get<Category[]>(`${this.baseUrl}/category/find-all`).subscribe(
      data => this.categories = data,
      error => console.error(error)
    );
  }

  onSubmit() {
    const productData = {
      description: this.newProduct.description,
      stock: this.newProduct.stock,
      price: this.newProduct.price,
      category_id: this.newProduct.categoryId
    };
    this.http.post(`${this.baseUrl}/product`, productData).subscribe(
      response => {
        this.loadProducts();
        this.closeModal();
      },
      error => {
        console.error('Erro ao cadastrar produto', error);
      }
    );
  }

  closeModal() {
    if (this.addProductModal) {
      this.addProductModal.nativeElement.classList.remove('show');
      this.addProductModal.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
    }
  }
}
