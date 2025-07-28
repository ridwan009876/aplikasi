// src/app/login/login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonicModule,
  NavController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.initForm();
  }

  // Initialize form with validators
  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Submit login form
  async login() {
    if (this.loginForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent'
    });
    await loading.present();

    const credentials = {
      aksi: 'login',
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post('http://smk.aplikasi.blog/action.php', credentials).subscribe(
      async (res: any) => {
        await loading.dismiss();

        const toast = await this.toastCtrl.create({
          message: res.success ? 'Login berhasil!' : res.msg || 'Login gagal.',
          duration: 2000,
          color: res.success ? 'success' : 'danger',
        });
        await toast.present();

        if (res.success) {
          this.navCtrl.navigateRoot('/tabs'); // Navigate to home/dashboard page
        }
      },
      async () => {
        await loading.dismiss();

        const toast = await this.toastCtrl.create({
          message: 'Terjadi kesalahan koneksi.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }
}
