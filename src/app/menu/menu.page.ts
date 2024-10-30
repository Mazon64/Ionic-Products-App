import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  constructor(private router: Router) { }

  // Métodos para navegar a las diferentes páginas
  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToClients() {
    this.router.navigate(['/clients']);
  }
}
