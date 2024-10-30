import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

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
  editIndex: number | null = null; // Para saber si estamos editando un producto

  constructor(private alertController: AlertController) {
    // Cargar productos desde localStorage al inicializar
    let productsLocal = localStorage.getItem('products');
    if (productsLocal) {
      this.products = JSON.parse(productsLocal);
    }
  }

  // Guardar productos en localStorage
  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct() {
    if (this.editIndex !== null) {
      // Si estamos editando, actualizamos el producto
      this.products[this.editIndex] = this.product;
      this.editIndex = null;
    } else {
      // Si no estamos editando, agregamos el nuevo producto
      this.products.push({ ...this.product });
    }

    this.saveProducts(); // Guardar cambios en localStorage
    this.clearForm(); // Limpiar el formulario
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
    // Cargamos los datos del producto a editar en el formulario
    this.product = { ...this.products[index] };
    this.editIndex = index; // Guardamos el índice del producto que estamos editando
  }

  cancelEdit() {
    this.clearForm();
    this.editIndex = null;
  }

  async deleteProduct(index: number) {
    // Mostramos un mensaje de confirmación antes de eliminar
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
            // Si el usuario confirma, eliminamos el producto
            this.products.splice(index, 1); // Eliminamos el producto
            this.saveProducts(); // Guardamos los cambios en localStorage
          }
        }
      ]
    });

    await alert.present(); // Presentamos el cuadro de diálogo
  }

  // Método para cargar productos desde localStorage (opcional si lo necesitas en alguna vista específica)
  loadProducts() {
    let productsLocal = localStorage.getItem('products');
    if (productsLocal) {
      this.products = JSON.parse(productsLocal);
    }
  }
}
