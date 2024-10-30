import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegisterModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    if (this.authService.isAuthenticated()) {
      this.navCtrl.navigateRoot('/menu');
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      storeName: ['', Validators.required],
      storePhotoUrl: ['', Validators.required],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password, rememberMe } = this.loginForm.value;

      if (this.authService.login(username, password, rememberMe)) {
        this.navCtrl.navigateRoot('/menu');
      } else {
        const toast = await this.toastController.create({
          message: 'Credenciales inválidas',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    }
  }

  async onRegister() {
    if (this.registerForm.valid) {
      if (this.authService.register(this.registerForm.value)) {
        const toast = await this.toastController.create({
          message: 'Usuario registrado exitosamente',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.closeRegisterModal();
      } else {
        const toast = await this.toastController.create({
          message: 'El nombre de usuario ya existe',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    }
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
    this.registerForm.reset();
  }
}