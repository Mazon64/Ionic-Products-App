import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  cost: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss'],
})

export class ProductsPage {
  product: Product = {
    id: Date.now(),
    name: '',
    description: '',
    quantity: 0,
    cost: 0,
    price: 0,
    imageUrl: ''
  };

  products: Product[] = [];
  editIndex: number | null = null;

  constructor(private alertController: AlertController) {
    let productsLocal = localStorage.getItem('products');
    if (productsLocal) {
      this.products = JSON.parse(productsLocal);
    }
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct() {
    if (this.editIndex !== null) {
      this.products[this.editIndex] = this.product;
      this.editIndex = null;
    } else {
      this.products.push({ ...this.product });
    }

    this.saveProducts();
    this.clearForm();
  }

  clearForm() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      quantity: 0,
      cost: 0,
      price: 0,
      imageUrl: ''
    };
    this.editIndex = null;
  }

  editProduct(index: number) {
    this.product = { ...this.products[index] };
    this.editIndex = index;
  }

  cancelEdit() {
    this.clearForm();
    this.editIndex = null;
  }

  async deleteProduct(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.products.splice(index, 1);
            this.saveProducts();
          }
        }
      ]
    });

    await alert.present();
  }

  loadProducts() {
    let productsLocal = localStorage.getItem('products');
    if (productsLocal) {
      this.products = JSON.parse(productsLocal);
    }
  }
}
