function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('mainContent').classList.toggle('shift');
}

function salvarConfiguracao() {
  const nome = document.getElementById("nome").value;
  const ano = document.getElementById("ano").value;
  const classe = document.getElementById("classe").value;
  const disciplinas = document.getElementById("disciplinas").value.split(',').map(d => d.trim()).filter(d => d);

  if (nome && ano && classe) {
    const dados = { nome, ano, classe, disciplinas };
    localStorage.setItem("usuarioEstudoPlus", JSON.stringify(dados));
    iniciarAplicacao();
  } else {
    alert("Preencha todos os campos obrigatórios.");
  }
}

function iniciarAplicacao() {
  const dados = JSON.parse(localStorage.getItem("usuarioEstudoPlus"));
  document.getElementById("setup").style.display = "none";
  document.querySelector(".toggle-btn").style.display = "block";
  document.getElementById("mainContent").style.display = "block";
  document.getElementById("boasVindas").innerText = `Olá, ${dados.nome}!`;

  const container = document.getElementById("disciplinasContainer");
  container.innerHTML = "";
  dados.disciplinas.forEach(d => {
    const box = document.createElement("div");
    box.className = "disciplina-box";
    box.innerHTML = `<h3>${d}</h3>`;
    container.appendChild(box);
  });
}

function adicionarNovaDisciplina() {
  const nova = prompt("Digite o nome da nova disciplina:");
  if (nova) {
    const dados = JSON.parse(localStorage.getItem("usuarioEstudoPlus"));
    dados.disciplinas.push(nova);
    localStorage.setItem("usuarioEstudoPlus", JSON.stringify(dados));
    iniciarAplicacao();
  }
}

const dadosSalvos = localStorage.getItem("usuarioEstudoPlus");
if (dadosSalvos) iniciarAplicacao();
