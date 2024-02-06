<?php

$hostname = "localhost";
$bancodedados = "TresFlores";
$usuario = "root"; 
$senha = "";

$conn = new mysqli($hostname, $usuario, $senha, $bancodedados);
if ($conn->connect_errno) {
    echo "Falha ao conectar: (" . $conn->connect_errno . ") " . $conn->connect_error;
}

