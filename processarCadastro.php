<?php

require_once "conexao.php";

if(isset($_POST['cadastro'])) {

// Obter os dados do formulário
$nome = $_POST["nome"];
$email = $_POST["email"];
$nickname = $_POST["nickname"];
$nascimento = $_POST["data"];
$senha = $_POST["senha"];
$confirmarsenha = $_POST["confirmarsenha"];


if ($senha == $confirmarsenha){


// Inserir os dados na tabela 'usuario'
$sql = "INSERT INTO usuario (nome, email, nascimento, nickname, senha) VALUES 
('$nome', '$email', '$nascimento', '$nickname', '$senha')";

if ($conn->query($sql) === TRUE) {
    header("Location: login.php");
    exit();
} else {
    echo "Erro ao cadastrar o usuário: " . $conn->error;
}
}
else {
    header("Location: cadastreSe.php?erro2=emailsenha");
    exit();
}

$conn->close();
}
?>