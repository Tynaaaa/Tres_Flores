

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="estilos/mod.css">
    <title>Login</title>
</head>
<body style="background-image: url('imagens/formulario.gif');">

    <div class="login">
        <h1> Acesse a sua conta </h1>

        <form action="processarLogin.php" method="POST">
            <p>
                <label>E-mail:</label>
                <input type="email" id="email" name="email" placeholder="Digite aqui o seu E-mail" required>
            </p>
    
            <p>
                <label>Nickname:</label>
                <input type="text" id="nickname" name="nickname" placeholder="Digite aqui o seu nickname" required>
            </p>
  
            <p>
                <label>Senha:</label>
                <input type="password" id="senha" name="senha" placeholder="Digite aqui a sua senha" required>
            </p>

        
            <button type="submit" name="login" id="login" class="inicio">Login</button> 
            <a href="cadastreSe.php" class="inicio">Cadastre-se</a>
            
        </form> 
    </div>
</body>
</html>





