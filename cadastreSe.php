

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos/mod.css">
    <title>Cadastre-se</title>
</head>
<body style="background-image: url('imagens/formulario.gif');">

    <div class="login">
        <h1>Cadastre-se</h1>

        <form action="processarCadastro.php" method="post">

        <p>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Digite o seu nome" required>
        </p>

        <p>
            <label for="nome">Nickname:</label>
            <input type="text" id="nickname" name="nickname" placeholder="Digite o seu nickname" required>
        </p>

        <p>
            <label for="nome">Data de nascimento:</label>
            <input type="date" id="data" name="data" required>
        </p>

        <p>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="Digite o seu email" required>
        </p>

        <p>
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" placeholder="Digite a sua senha" required>
        </p>

        <p>
            <label for="confirmarsenha">Confirmar Senha:</label>
            <input type="password" id="confirmarsenha" name="confirmarsenha" placeholder="Digite a sua senha" required>
        </p>

            <?php if (isset($_GET['erro2'])){?>
            <label for="invalido" class="erro" style="color: red;">E-mail ou senha inválida</label>
            <?php }
            ?>
                
            <button type="submit" name="cadastro" id="cadastrar" class="inicio">Cadastrar usuario</button>
            <a href="login.php" class="inicio">Login</a>


        </form>
    </div>


</body>
</html>