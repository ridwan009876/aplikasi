-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 28 Jul 2025 pada 23.07
-- Versi server: 11.4.7-MariaDB-cll-lve
-- Versi PHP: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apln4872_smk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `id_siswa` int(11) DEFAULT NULL,
  `nama` varchar(100) NOT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `jk` enum('L','P') DEFAULT 'L',
  `status` enum('Hadir','Izin','Sakit','Alpa') NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_input` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `absensi`
--

INSERT INTO `absensi` (`id`, `id_siswa`, `nama`, `nisn`, `kelas`, `jk`, `status`, `tanggal`, `waktu_input`) VALUES
(1, NULL, 'Subang', '56426524561', 'IPA 1', 'L', 'Sakit', '2025-06-28', '2025-06-28 20:42:58'),
(2, NULL, 'ridwan', '22100089', 'IPA 1', 'P', 'Sakit', '2025-06-28', '2025-06-28 20:44:23'),
(4, NULL, 'eci', '1234567453', 'ipa 1', 'L', 'Sakit', '2025-06-04', '2025-07-04 21:42:22'),
(5, NULL, 'sepra', '22100078', '12', 'P', 'Izin', '2025-07-09', '2025-07-11 18:53:22'),
(6, NULL, 'ridwan', '22100089', '4', 'L', 'Izin', '2025-08-11', '2025-07-11 20:52:57'),
(7, NULL, 'sanggar', '22100089', 'ipa', 'P', 'Alpa', '2025-07-11', '2025-07-11 22:59:09'),
(8, NULL, 'ridwan', '2210087', 'sbk', 'L', 'Alpa', '2025-07-13', '2025-07-13 15:16:36'),
(9, NULL, 'lias', '20100067', '13', 'L', '', '2025-07-13', '2025-07-13 17:53:00'),
(10, NULL, 'ridwan PANDIANGAN34', '22100078', 'pkn', 'L', 'Hadir', '2025-07-13', '2025-07-13 18:03:29'),
(11, NULL, 'tior', '221000890', '8', 'L', 'Hadir', '2025-07-16', '2025-07-16 12:23:17'),
(12, NULL, 'ariek', '22100089', '134', 'L', 'Sakit', '2025-07-25', '2025-07-23 16:35:40'),
(13, NULL, 'buyung', '22100089', '9', 'L', 'Hadir', '2025-07-26', '2025-07-26 14:31:58'),
(14, NULL, 'agung', '22100089', '11', 'L', 'Sakit', '2025-07-26', '2025-07-26 14:53:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `nama_kelas` varchar(100) NOT NULL,
  `jadwal_masuk` varchar(50) NOT NULL,
  `mata_pelajaran` varchar(100) NOT NULL,
  `jumlah_siswa` int(11) NOT NULL,
  `guru_pengampu` varchar(100) NOT NULL,
  `kode_kelas` varchar(50) NOT NULL,
  `tahun_ajaran` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`, `jadwal_masuk`, `mata_pelajaran`, `jumlah_siswa`, `guru_pengampu`, `kode_kelas`, `tahun_ajaran`, `created_at`) VALUES
(33, 'SANGGAR', '2025-07-14T08:30:00', 'BAHASA ARAB', 30, 'WADAIYA', '123', '2028/2029', '2025-07-13 18:05:42'),
(36, 'Sanggar', '2025-07-10T19:14:00', 'IPS', 132, 'Ramles', '723562176', '2026/2027', '2025-07-15 12:16:06'),
(37, 'Sanggar', '2025-07-10T19:14:00', 'IPS', 132, 'Ramles', '723562176', '2026/2027', '2025-07-15 12:16:12'),
(38, 'kontol  anjing', '2025-07-09T22:36:00', 'ips', 32, 'polin', 'abc', '2025', '2025-07-15 15:37:12'),
(39, 'hgtcf', '2025-07-16T22:39:00', 'bjghuuhg', 65, 'njbjnml', 'mbkvkh', '2182', '2025-07-15 15:40:20'),
(40, 'gusto', '2025-07-16T18:58:00', 'ipa', 99, 'eci', '001', '2025', '2025-07-16 11:59:38'),
(42, 'tol', '2025-07-21T18:38:00', 'mtk', 23, 'polin', 'rex', '2024', '2025-07-21 11:39:34'),
(43, 'ridwanarif', '2025-07-23T08:00:00', 'mtk', 23, 'polin', 'eri', '2025/2026', '2025-07-23 16:35:01'),
(44, 'ridwanarif', '2025-07-23T08:00:00', 'mtk', 23, 'polin', 'eri', '2025/2026', '2025-07-23 16:35:02'),
(47, 'ridwan', '2025-07-26T08:00:00', 'mtk', 26, 'sanggar', 'otp', '2024/2025', '2025-07-26 14:49:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
