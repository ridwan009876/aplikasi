import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class Tab4Page implements OnInit {
  rataRataNilai: number = 0;
  totalTugasSelesai: number = 0;
  totalJamBelajar: number = 0;

  // Form input data
  namaBaru: string = '';
  nilaiBaru: number | null = null;
  tugasBaru: number | null = null;
  jamBaru: number | null = null;

  detailMataPelajaran: {
    nama: string;
    nilai: number;
    tugasSelesai: number;
    jamBelajar: number;
  }[] = [];

  constructor(private toastController: ToastController) {}

  ngOnInit(): void {
    // Data awal
    this.detailMataPelajaran = [
      { nama: 'Matematika', nilai: 90, tugasSelesai: 12, jamBelajar: 30 },
      { nama: 'Bahasa Indonesia', nilai: 85, tugasSelesai: 10, jamBelajar: 25 },
    ];
    this.hitungStatistik();
  }

  tambahMataPelajaran(): void {
    if (
      !this.namaBaru.trim() ||
      this.nilaiBaru === null ||
      this.tugasBaru === null ||
      this.jamBaru === null
    ) {
      this.showToast('Mohon isi semua field!');
      return;
    }

    this.detailMataPelajaran.push({
      nama: this.namaBaru,
      nilai: this.nilaiBaru,
      tugasSelesai: this.tugasBaru,
      jamBelajar: this.jamBaru,
    });

    this.namaBaru = '';
    this.nilaiBaru = null;
    this.tugasBaru = null;
    this.jamBaru = null;

    this.hitungStatistik();
    this.showToast('Data berhasil ditambahkan!');
  }

  hitungStatistik(): void {
    const totalNilai = this.detailMataPelajaran.reduce((sum, p) => sum + p.nilai, 0);
    this.rataRataNilai = this.detailMataPelajaran.length
      ? Math.round(totalNilai / this.detailMataPelajaran.length)
      : 0;

    this.totalTugasSelesai = this.detailMataPelajaran.reduce((sum, p) => sum + p.tugasSelesai, 0);
    this.totalJamBelajar = this.detailMataPelajaran.reduce((sum, p) => sum + p.jamBelajar, 0);
  }

  // ✅ Klik pada item list
  onKlikPelajaran(index: number): void {
    const pelajaran = this.detailMataPelajaran[index];
    const pesan = `📘 ${pelajaran.nama} | Nilai: ${pelajaran.nilai}, Tugas: ${pelajaran.tugasSelesai}, Jam: ${pelajaran.jamBelajar}`;
    this.showToast(pesan);
  }

  private async showToast(pesan: string): Promise<void> {
    const toast = await this.toastController.create({
      message: pesan,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
