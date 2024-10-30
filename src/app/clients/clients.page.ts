import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  editIndex: number | null = null;

  constructor(private alertController: AlertController) {
    let clientsLocal = localStorage.getItem('clients');
    if (clientsLocal) {
      this.clients = JSON.parse(clientsLocal);
    }
  }

  saveClients() {
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }

  addClient() {
    if (this.editIndex !== null) {
      this.clients[this.editIndex] = this.client;
      this.editIndex = null;
    } else {
      this.clients.push({ ...this.client });
    }

    this.saveClients();
    this.clearForm();
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
    this.client = { ...this.clients[index] };
    this.editIndex = index;
  }

  cancelEdit() {
    this.clearForm();
    this.editIndex = null;
  }

  async deleteClient(index: number) {
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
            this.clients.splice(index, 1);
            this.saveClients();
          }
        }
      ]
    });

    await alert.present();
  }

  loadClients() {
    let clientsLocal = localStorage.getItem('clients');
    if (clientsLocal) {
      this.clients = JSON.parse(clientsLocal);
    }
  }
}
