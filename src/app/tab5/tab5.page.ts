import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class Tab5Page implements OnInit {

  daftarTugas: {
    judul: string;
    mapel: string;
    deadline: string;
  }[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.loadDaftarTugas();
  }

  loadDaftarTugas(): void {
    this.daftarTugas = [
      {
        judul: 'Membuat Jaringan LAN',
        mapel: 'Produktif TKJ',
        deadline: '2025-06-20'
      },
      {
        judul: 'Desain UI Aplikasi Absen',
        mapel: 'RPL',
        deadline: '2025-06-22'
      },
      {
        judul: 'Presentasi Proyek Multimedia',
        mapel: 'Multimedia',
        deadline: '2025-06-25'
      },
      {
        judul: 'Laporan Keuangan Bulanan',
        mapel: 'Akuntansi',
        deadline: '2025-06-28'
      }
    ];
  }

  logout(): void {
    // Hapus data login jika disimpan di localStorage/sessionStorage (opsional)
    localStorage.removeItem('user'); // jika menyimpan data login
    this.navCtrl.navigateRoot('/login');
  }
}
