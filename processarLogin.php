
<?php
include('conexao.php');

if(isset($_POST['email']) && isset($_POST['senha'])) {

    if(strlen($_POST['email']) == 0) {
        echo "Preencha seu e-mail";
    } else if(strlen($_POST['senha']) == 0) {
        echo "Preencha sua senha";
    } else {

        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $nickname = $_POST['nickname'];

        $sql_code = "SELECT * FROM usuario WHERE email = '$email' AND senha = '$senha' AND nickname = '$nickname'";
        $result = $conn->query($sql_code);// 


        if($result->num_rows == 1) {
        $usuario = $result->fetch_assoc();

            if(!isset($_SESSION)) {
                session_start();
            }

            $_SESSION['nome'] = $usuario['nome'];

            header("Location: index.html");

        } else {
            header("Location: login.php");
        }

    }

}
?>

