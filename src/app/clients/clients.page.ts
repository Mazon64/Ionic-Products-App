import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage {
  client: Client = {
    id: Date.now(),
    name: '',
    address: '',
    phone: '',
    email: '',
    imageUrl: ''
  };

  clients: Client[] = [];
  editIndex: number | null = null; // Para saber si estamos editando un cliente

  constructor(private alertController: AlertController) {
    // Cargar clientes desde localStorage al inicializar
    let clientsLocal = localStorage.getItem('clients');
    if (clientsLocal) {
      this.clients = JSON.parse(clientsLocal);
    }
  }

  // Guardar clientes en localStorage
  saveClients() {
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }

  addClient() {
    if (this.editIndex !== null) {
      // Si estamos editando, actualizamos el cliente
      this.clients[this.editIndex] = this.client;
      this.editIndex = null;
    } else {
      // Si no estamos editando, agregamos el nuevo cliente
      this.clients.push({ ...this.client });
    }

    this.saveClients(); // Guardar cambios en localStorage
    this.clearForm(); // Limpiar el formulario
  }

  clearForm() {
    this.client = {
      id: 0,
      name: '',
      address: '',
      phone: '',
      email: '',
      imageUrl: ''
    };
    this.editIndex = null;
  }

  editClient(index: number) {
    // Cargamos los datos del cliente a editar en el formulario
    this.client = { ...this.clients[index] };
    this.editIndex = index; // Guardamos el índice del cliente que estamos editando
  }

  cancelEdit() {
    this.clearForm(); // Limpiar el formulario
    this.editIndex = null; // Reiniciar el índice de edición
  }

  async deleteClient(index: number) {
    // Mostramos un mensaje de confirmación antes de eliminar
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Si el usuario confirma, eliminamos el cliente
            this.clients.splice(index, 1); // Eliminamos el cliente
            this.saveClients(); // Guardamos los cambios en localStorage
          }
        }
      ]
    });

    await alert.present(); // Presentamos el cuadro de diálogo
  }

  // Método para cargar clientes desde localStorage (opcional si lo necesitas en alguna vista específica)
  loadClients() {
    let clientsLocal = localStorage.getItem('clients');
    if (clientsLocal) {
      this.clients = JSON.parse(clientsLocal);
    }
  }
}
