import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class Tab1Page implements OnInit {

  namaKelas = '';
  jadwalMasuk = '';
  mataPelajaran = '';
  jumlahSiswa: number | null = null;
  guruPengampu = '';
  kodeKelas = '';
  tahunAjaran = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private postPvdr: PostProvider
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  async simpanKelas() {
    if (this.namaKelas.trim() === '') {
      return this.showToast('Nama kelas harus diisi');
    }

    if (this.jadwalMasuk.trim() === '') {
      return this.showToast('Jadwal masuk harus diisi');
    }

    if (this.mataPelajaran.trim() === '') {
      return this.showToast('Mata pelajaran harus diisi');
    }

    if (this.jumlahSiswa == null || this.jumlahSiswa <= 0) {
      return this.showToast('Jumlah siswa harus lebih dari 0');
    }

    if (this.guruPengampu.trim() === '') {
      return this.showToast('Guru pengampu harus diisi');
    }

    if (this.kodeKelas.trim() === '') {
      return this.showToast('Kode kelas harus diisi');
    }

    if (this.tahunAjaran.trim() === '') {
      return this.showToast('Tahun ajaran harus diisi');
    }

   const body = {
  aksi: 'tambah_kelas',
  data: {
    namaKelas: this.namaKelas,
    jadwalMasuk: this.jadwalMasuk,
    mataPelajaran: this.mataPelajaran,
    jumlahSiswa: this.jumlahSiswa,
    guruPengampu: this.guruPengampu,
    kodeKelas: this.kodeKelas,
    tahunAjaran: this.tahunAjaran
  }
};

    this.postPvdr.postData(body, 'action.php').subscribe({
      next: async (data: any) => {
        if (data.success) {
          await this.showToast('Data kelas berhasil disimpan');
          this.router.navigate(['/tabs/tab2']);
        } else {
          await this.showToast(data.msg || 'Gagal menyimpan data');
        }
      },
      error: async (err) => {
        console.error(err);
        await this.showToast('Terjadi kesalahan saat menyimpan data');
      }
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
