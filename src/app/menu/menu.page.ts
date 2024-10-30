import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {
  storeName: string = '';
  storePhotoUrl: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.storeName = currentUser.storeName;
      this.storePhotoUrl = currentUser.storePhotoUrl;
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToClients() {
    this.router.navigate(['/clients']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}