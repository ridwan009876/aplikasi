<?php
// db_config.php

header('Access-Control-Allow-Origin: *');

$hostname = 'localhost';
$username = 'apln4872_smk';
$password = 'C&[5xIPN@&sD@?xf'; // isi jika MySQL Anda memiliki password
$database = 'apln4872_smk';
$charset  = 'utf8';

$dsn = "mysql:host=$hostname;port=3306;dbname=$database;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // disarankan pakai array, bukan object
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'msg' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}