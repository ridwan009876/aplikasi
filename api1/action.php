<?php
// === CORS & Header Handling ===
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// === Database Connection ===
require_once "db_config.php";
if (!isset($pdo)) {
    sendResponse(false, 'Koneksi ke database gagal.');
}

// === Baca Input JSON ===
$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = $postjson['aksi'] ?? '';

if (!$aksi) {
    sendResponse(false, 'Parameter aksi tidak ditemukan.');
}

// === Handle Request ===
switch ($aksi) {
    case 'login':
        login($pdo, $postjson);
        break;
    case 'tambah_kelas':
        tambahKelas($pdo, $postjson['data']);
        break;
    case 'edit_kelas':
        editKelas($pdo, $postjson['data']);
        break;
    case 'hapus_kelas':
        hapusKelas($pdo, $postjson['id']);
        break;
    case 'get_kelas':
        getKelas($pdo, $postjson);
        break;
    case 'tambah_absensi_manual':
        tambahAbsensiManual($pdo, $postjson['data']);
        break;
    case 'edit_absensi':
        editAbsensi($pdo, $postjson['data']);
        break;
    case 'get_absensi':
        getAbsensi($pdo);
        break;
    default:
        sendResponse(false, 'Aksi tidak dikenali.');
        break;
}

// === FUNCTION ===

function login($pdo, $data)
{
    $username = trim($data['username'] ?? '');
    $password = trim($data['password'] ?? '');

    if (!$username || !$password) {
        sendResponse(false, 'Username dan password wajib diisi.');
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username LIMIT 1");
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['password'] === $password) {
            sendResponse(true, 'Login berhasil!');
        } else {
            sendResponse(false, 'Username atau password salah.');
        }
    } catch (PDOException $e) {
        sendResponse(false, 'Kesalahan saat login: ' . $e->getMessage());
    }
}

function tambahKelas($pdo, $data)
{
    $fields = ['namaKelas', 'jadwalMasuk', 'mataPelajaran', 'jumlahSiswa', 'guruPengampu', 'kodeKelas', 'tahunAjaran'];
    foreach ($fields as $field) {
        if (empty($data[$field])) {
            sendResponse(false, "Field $field wajib diisi.");
        }
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO kelas (
                nama_kelas, jadwal_masuk, mata_pelajaran, jumlah_siswa,
                guru_pengampu, kode_kelas, tahun_ajaran
            ) VALUES (
                :namaKelas, :jadwalMasuk, :mataPelajaran, :jumlahSiswa,
                :guruPengampu, :kodeKelas, :tahunAjaran
            )
        ");
        $stmt->execute([
            ':namaKelas'     => $data['namaKelas'],
            ':jadwalMasuk'   => $data['jadwalMasuk'],
            ':mataPelajaran' => $data['mataPelajaran'],
            ':jumlahSiswa'   => $data['jumlahSiswa'],
            ':guruPengampu'  => $data['guruPengampu'],
            ':kodeKelas'     => $data['kodeKelas'],
            ':tahunAjaran'   => $data['tahunAjaran']
        ]);
        sendResponse(true, 'Kelas berhasil ditambahkan.');
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal menambahkan kelas: ' . $e->getMessage());
    }
}

function editKelas($pdo, $data)
{
    $id = intval($data['id'] ?? 0);
    if ($id <= 0) {
        sendResponse(false, 'ID kelas tidak valid.');
    }

    $fields = ['namaKelas', 'jadwalMasuk', 'mataPelajaran', 'jumlahSiswa', 'guruPengampu', 'kodeKelas', 'tahunAjaran'];
    foreach ($fields as $field) {
        if (empty($data[$field])) {
            sendResponse(false, "Field $field wajib diisi.");
        }
    }

    try {
        $stmt = $pdo->prepare("
            UPDATE kelas SET
                nama_kelas = :namaKelas,
                jadwal_masuk = :jadwalMasuk,
                mata_pelajaran = :mataPelajaran,
                jumlah_siswa = :jumlahSiswa,
                guru_pengampu = :guruPengampu,
                kode_kelas = :kodeKelas,
                tahun_ajaran = :tahunAjaran
            WHERE id = :id
        ");
        $stmt->execute([
            ':id'            => $id,
            ':namaKelas'     => $data['namaKelas'],
            ':jadwalMasuk'   => $data['jadwalMasuk'],
            ':mataPelajaran' => $data['mataPelajaran'],
            ':jumlahSiswa'   => $data['jumlahSiswa'],
            ':guruPengampu'  => $data['guruPengampu'],
            ':kodeKelas'     => $data['kodeKelas'],
            ':tahunAjaran'   => $data['tahunAjaran']
        ]);

        sendResponse(true, 'Kelas berhasil diperbarui.');
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal memperbarui kelas: ' . $e->getMessage());
    }
}

function hapusKelas($pdo, $id)
{
    $id = intval($id ?? 0);
    if ($id <= 0) {
        sendResponse(false, 'ID tidak valid.');
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM kelas WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendResponse(true, 'Kelas berhasil dihapus.');
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal menghapus kelas: ' . $e->getMessage());
    }
}

function getKelas($pdo, $data)
{
    $limit = intval($data['limit'] ?? 10);
    $start = intval($data['start'] ?? 0);

    try {
        $stmt = $pdo->prepare("
            SELECT 
                id,
                nama_kelas AS namaKelas,
                jadwal_masuk AS jadwalMasuk,
                mata_pelajaran AS mataPelajaran,
                jumlah_siswa AS jumlahSiswa,
                guru_pengampu AS guruPengampu,
                kode_kelas AS kodeKelas,
                tahun_ajaran AS tahunAjaran
            FROM kelas
            ORDER BY id DESC
            LIMIT :start, :limit
        ");
        $stmt->bindValue(':start', $start, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        sendResponse(true, 'Data kelas berhasil dimuat.', $result ?: []);
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal mengambil data kelas: ' . $e->getMessage());
    }
}

function tambahAbsensiManual($pdo, $data)
{
    $nama     = trim($data['nama'] ?? '');
    $nisn     = trim($data['nisn'] ?? '');
    $kelas    = trim($data['kelas'] ?? '');
    $jk       = trim($data['jk'] ?? '');
    $status   = trim($data['status'] ?? '');
    $tanggal  = trim($data['tanggal'] ?? '');

    if (!$nama || !$kelas || !$status || !$tanggal) {
        sendResponse(false, 'Field nama, kelas, status, dan tanggal wajib diisi.');
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO absensi (nama, nisn, kelas, jk, status, tanggal)
            VALUES (:nama, :nisn, :kelas, :jk, :status, :tanggal)
        ");
        $stmt->execute([
            ':nama'    => $nama,
            ':nisn'    => $nisn,
            ':kelas'   => $kelas,
            ':jk'      => $jk,
            ':status'  => $status,
            ':tanggal' => $tanggal
        ]);
        sendResponse(true, 'Absensi berhasil disimpan.');
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal menyimpan absensi: ' . $e->getMessage());
    }
}

function editAbsensi($pdo, $data)
{
    $id       = intval($data['id'] ?? 0);
    $nama     = trim($data['nama'] ?? '');
    $nisn     = trim($data['nisn'] ?? '');
    $kelas    = trim($data['kelas'] ?? '');
    $jk       = trim($data['jk'] ?? '');
    $status   = trim($data['status'] ?? '');
    $tanggal  = trim($data['tanggal'] ?? '');

    if ($id <= 0) {
        sendResponse(false, 'ID absensi tidak valid.');
    }
    if (!$nama || !$kelas || !$status || !$tanggal) {
        sendResponse(false, 'Field nama, kelas, status, dan tanggal wajib diisi.');
    }

    try {
        $stmt = $pdo->prepare("
            UPDATE absensi 
            SET nama = :nama, nisn = :nisn, kelas = :kelas, jk = :jk, status = :status, tanggal = :tanggal
            WHERE id = :id
        ");
        $stmt->execute([
            ':id'      => $id,
            ':nama'    => $nama,
            ':nisn'    => $nisn,
            ':kelas'   => $kelas,
            ':jk'      => $jk,
            ':status'  => $status,
            ':tanggal' => $tanggal
        ]);
        sendResponse(true, 'Absensi berhasil diperbarui.');
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal memperbarui absensi: ' . $e->getMessage());
    }
}

function getAbsensi($pdo)
{
    try {
        $stmt = $pdo->prepare("SELECT id, nama, nisn, kelas, jk, status, tanggal FROM absensi ORDER BY id DESC");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            sendResponse(true, 'Data absensi berhasil dimuat.', $result);
        } else {
            sendResponse(true, 'Belum ada data absensi.', []);
        }
    } catch (PDOException $e) {
        sendResponse(false, 'Gagal mengambil data absensi: ' . $e->getMessage());
    }
}

function sendResponse($success, $msg, $result = null)
{
    $res = ['success' => $success, 'msg' => $msg];
    if (!is_null($result)) $res['result'] = $result;

    echo json_encode($res);
    exit;
}