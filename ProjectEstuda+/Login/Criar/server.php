<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $dados = [
    "primeiroNome" => $_POST["primeiroNome"],
    "ultimoNome" => $_POST["ultimoNome"],
    "usuario" => $_POST["usuario"],
    "idade" => $_POST["idade"],
    "sexo" => $_POST["sexo"],
    "ensino" => $_POST["ensino"],
    "classe" => $_POST["classe"],
    "disciplinas" => $_POST["disciplinas"],
    "senha" => password_hash($_POST["senha"], PASSWORD_DEFAULT)
  ];

  $arquivo = fopen("usuarios.txt", "a");
  fwrite($arquivo, json_encode($dados) . PHP_EOL);
  fclose($arquivo);

  echo "<h2>Perfil criado com sucesso!</h2>";
  echo "<a href='perfil.html'>Voltar</a>";
} else {
  header("Location: perfil.html");
}
?>
