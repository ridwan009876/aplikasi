import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab3Page implements OnInit {

  tanggal: string = new Date().toISOString().split('T')[0];

  formAbsensi = {
    nama: '',
    nisn: '',
    kelas: '',
    jk: '',
    status: '',
    tanggal: this.tanggal
  };

  riwayatAbsensi: any[] = [];
  isEditing = false;
  editAbsensi: any = {};

  constructor(
    private toastController: ToastController,
    private postPvdr: PostProvider
  ) {}

  ngOnInit() {
    this.loadRiwayatAbsensi();
  }

  simpanAbsensiManual() {
    const { nama, kelas, status, tanggal } = this.formAbsensi;

    if (!nama.trim() || !kelas.trim() || !status.trim() || !tanggal.trim()) {
      this.showToast('Nama, kelas, status, dan tanggal wajib diisi');
      return;
    }

    const body = {
      aksi: 'tambah_absensi_manual',
      data: { ...this.formAbsensi }
    };

    this.postPvdr.postData(body, 'action.php').subscribe(
      (res: any) => {
        if (res.success) {
          this.showToast('Absensi berhasil disimpan');
          this.resetForm();
          this.loadRiwayatAbsensi();
        } else {
          this.showToast(res.msg || 'Gagal menyimpan absensi');
        }
      },
      err => {
        console.error('Error:', err);
        this.showToast('Terjadi kesalahan saat menyimpan');
      }
    );
  }

  editData(data: any) {
    this.isEditing = true;
    this.editAbsensi = { ...data };
  }

  batalEdit() {
    this.isEditing = false;
    this.editAbsensi = {};
  }

  simpanEditAbsensi() {
    const { nama, kelas, status, tanggal } = this.editAbsensi;

    if (!nama.trim() || !kelas.trim() || !status.trim() || !tanggal.trim()) {
      this.showToast('Semua kolom wajib diisi saat edit');
      return;
    }

    const body = {
      aksi: 'edit_absensi',
      data: { ...this.editAbsensi }
    };

    this.postPvdr.postData(body, 'action.php').subscribe(
      (res: any) => {
        if (res.success) {
          this.showToast('Absensi berhasil diperbarui');
          this.batalEdit();
          this.loadRiwayatAbsensi();
        } else {
          this.showToast(res.msg || 'Gagal memperbarui absensi');
        }
      },
      err => {
        console.error('Error:', err);
        this.showToast('Terjadi kesalahan saat memperbarui');
      }
    );
  }

  // ✅ Fungsi hapus absensi
  hapusData(id: number) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    const body = {
      aksi: 'hapus_absensi',
      id: id
    };

    this.postPvdr.postData(body, 'action.php').subscribe(
      (res: any) => {
        if (res.success) {
          this.showToast('Absensi berhasil dihapus');
          this.loadRiwayatAbsensi();
        } else {
          this.showToast(res.msg || 'Gagal menghapus data');
        }
      },
      err => {
        console.error('Error:', err);
        this.showToast('Terjadi kesalahan saat menghapus');
      }
    );
  }

  loadRiwayatAbsensi() {
    const body = { aksi: 'get_absensi' };

    this.postPvdr.postData(body, 'action.php').subscribe(
      (res: any) => {
        if (res.success) {
          this.riwayatAbsensi = res.result.map((item: any) => ({
            ...item,
            tanggal: item.tanggal || this.tanggal
          }));
        } else {
          this.riwayatAbsensi = [];
        }
      },
      err => {
        console.error('Error:', err);
        this.showToast('Gagal memuat riwayat absensi');
      }
    );
  }

  resetForm() {
    const now = new Date().toISOString().split('T')[0];
    this.formAbsensi = {
      nama: '',
      nisn: '',
      kelas: '',
      jk: '',
      status: '',
      tanggal: now
    };
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
