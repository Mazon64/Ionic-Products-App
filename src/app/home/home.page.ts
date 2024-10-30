import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegisterModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) {
    // Formulario de inicio de sesión
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Formulario de registro
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      storeName: ['', Validators.required],
      storePhotoUrl: ['', Validators.required],
    });
  }

  ngOnInit() { }

  // Lógica para el inicio de sesión
  onLogin() {
    if (this.loginForm.valid) {
      // Autenticación y redirección después de inicio de sesión exitoso
      this.navCtrl.navigateForward('/menu');
    }
  }

  // Abrir el modal de registro
  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  // Cerrar el modal de registro
  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  // Lógica para el registro de usuario
  onRegister() {
    if (this.registerForm.valid) {
      // Aquí puedes manejar el registro de usuario, almacenar los datos, etc.
      console.log('Registro exitoso:', this.registerForm.value);
      this.closeRegisterModal();  // Cierra el modal después del registro
    }
  }
}
