import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import type { RefresherCustomEvent } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab2Page implements OnInit {
  kelasList: any[] = [];
  limit: number = 10;
  start: number = 0;

  // Tambahan untuk fitur edit inline
  isEditing: boolean = false;
  editData: any = {};

  constructor(
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.resetData();
    this.loadKelas();
  }

  doRefresh(event: RefresherCustomEvent) {
    this.resetData();
    this.loadKelas().then(() => {
      event.target.complete();
    });
  }

  loadData(event: any) {
    this.start += this.limit;
    this.loadKelas().then(() => {
      event.target.complete();
    });
  }

  resetData() {
    this.kelasList = [];
    this.start = 0;
  }

  loadKelas(): Promise<boolean> {
    return new Promise(resolve => {
      const body = {
        aksi: 'get_kelas',
        limit: this.limit,
        start: this.start
      };

      this.postPvdr.postData(body, 'action.php').subscribe(
        data => {
          if (data.success && data.result && data.result.length > 0) {
            for (let item of data.result) {
              this.kelasList.push(item);
            }
          } else if (this.kelasList.length === 0) {
            this.presentToast('Tidak ada data kelas ditemukan.');
          }
          resolve(true);
        },
        err => {
          console.error('Error memuat kelas:', err);
          this.presentToast('Gagal memuat data kelas.');
          resolve(false);
        }
      );
    });
  }

  async hapusKelas(id: string) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah Anda yakin ingin menghapus kelas ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            const body = {
              aksi: 'hapus_kelas',
              id: id
            };

            this.postPvdr.postData(body, 'action.php').subscribe(
              async data => {
                if (data.success) {
                  this.resetData();
                  await this.loadKelas();
                  this.presentToast('Kelas berhasil dihapus.');
                } else {
                  this.presentToast('Gagal menghapus kelas.');
                }
              },
              error => {
                console.error('Hapus error:', error);
                this.presentToast('Terjadi kesalahan saat menghapus.');
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  // ✅ Edit inline di halaman ini (tidak pindah halaman)
  editKelas(kelas: any) {
    this.isEditing = true;
    this.editData = { ...kelas };
  }

  batalEdit() {
    this.isEditing = false;
    this.editData = {};
  }

submitEdit() {
  const body = {
    aksi: 'edit_kelas',
    data: this.editData
  };

  this.postPvdr.postData(body, 'action.php').subscribe(
    async (data: any) => {
      if (data.success) {
        this.presentToast('Data kelas berhasil diperbarui.');
        this.isEditing = false;
        this.editData = {};
        this.resetData();
        await this.loadKelas();
      } else {
        this.presentToast('Gagal memperbarui data.');
      }
    },
    error => {
      console.error('Edit error:', error);
      this.presentToast('Terjadi kesalahan saat mengedit.');
    }
  );
}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
