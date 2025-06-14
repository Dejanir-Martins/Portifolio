const inicioContainer = document.querySelector(".inicio");
const setupContainer = document.querySelector(".CriarPerfil");
const tipoEnsino = document.getElementById("Ensino");
const classe = document.getElementById("classe");

// Lógica para mudar classe com base no ensino
tipoEnsino.addEventListener("change", () => {
  const tipo = tipoEnsino.value;
  classe.innerHTML = "";
  classe.disabled = false;

  let opcoes = [];
  if (tipo === "Fundamental") opcoes = Array.from({ length: 9 }, (_, i) => `${i + 1}ª Classe`);
  if (tipo === "Médio") opcoes = ["10ª Classe", "11ª Classe", "12ª Classe", "13ª Classe"];
  if (tipo === "Superior") opcoes = ["1º Ano", "2º Ano", "3º Ano", "4º Ano"];

  opcoes.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    classe.appendChild(option);
  });
});

function CriarPerfil() {
  inicioContainer.style.display = "none";
  setupContainer.style.display = "block";
}

function voltar() {
  setupContainer.style.display = "none";
  inicioContainer.style.display = "block";
}


function gerarNome() {
  var nome = document.getElementById("primeiroNome").value.trim().toLowerCase();
  var sobrenome = document.getElementById("ultimoNome").value.trim().toLowerCase();
  var divSugestoes = document.getElementById("sugestoes");
  var opcoesContainer = document.getElementById("opcoes");

  if (!nome) return alert("Digite o primeiro nome!");

  const sugestoes = [
    nome + (sobrenome || ""),
    nome + Math.floor(Math.random() * 1000),
    sobrenome + "_" + nome
  ];

  opcoesContainer.innerHTML = "";
  sugestoes.forEach(sugestao => {
    var btn = document.createElement("button");
    btn.textContent = sugestao;
    btn.onclick = () => {
      document.getElementById("nomeUsuario").value = sugestao;

      document.getElementById("sugestoes").style.display = "none";
    };
    btn.style.color="red";
    opcoesContainer.appendChild(btn);

  });

  divSugestoes.style.display = "block";
}

function opcoes() {
  const campo = document.getElementById("outro");
  campo.style.display = "block";
  campo.oninput = () => {
    document.getElementById("nomeUsuario").value = campo.value.trim();
  };
}

// Salvar perfil
document.getElementById("dadosForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nomeUsuarioFinal = document.getElementById("nomeUsuario").value.trim();
  if (!nomeUsuarioFinal) return alert("Escolha ou escreva um nome de usuário!");

  const usuario = {
    primeiroNome: document.getElementById("primeiroNome").value.trim(),
    ultimoNome: document.getElementById("ultimoNome").value.trim(),
    nomeUsuario: nomeUsuarioFinal,
    genero: document.getElementById("genero").value,
    tipoEnsino: tipoEnsino.value,
    classe: classe.value,
    pin: document.getElementById("pin").value.trim()
  };

  let estudantes = JSON.parse(localStorage.getItem("estudantesEstudoPlus")) || [];
  estudantes.push(usuario);
  localStorage.setItem("estudantesEstudoPlus", JSON.stringify(estudantes));

  alert("Perfil criado com sucesso!");
  voltarInicio();
});

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("Nome").value.trim();
  const senha = document.getElementById("pwd").value.trim();

  const estudantes = JSON.parse(localStorage.getItem("estudantesEstudoPlus")) || [];
  const encontrado = estudantes.find(e => e.nomeUsuario === nome && e.pin === senha);

  if (encontrado) {
    const params = new URLSearchParams({
      user: encontrado.nomeUsuario,
      classe: encontrado.classe,
      genero: encontrado.genero

    });
    window.location.href = `../Main/main.index.html?${params.toString()}`;
  } else {
    alert("Usuário ou senha incorretos!");
  }
});
localStorage.setItem(nema, document.getElementById("primeiroNome").value.trim().toLowerCase());
