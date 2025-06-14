function getParametro(params) {
  return new URLSearchParams(window.location.search).get(params);
}

// Dados do usuário
var nome = getParametro("nome") || localStorage.getItem("nema") || "Dejanir";
var genero = getParametro("genero") || localStorage.getItem("genero") || "homem";
var classe = getParametro("classe") || localStorage.getItem("classe") || "12ª";
var anoLetivo = getParametro("ano") || localStorage.getItem("ano") || "2025";
var userID = nome.toLowerCase().replace(/\s+/g, "_");

// Salva em cache local
localStorage.setItem("nome", nome);
localStorage.setItem("genero", genero);
localStorage.setItem("classe", classe);
localStorage.setItem("ano", anoLetivo);

// Tema do fundo baseado no gênero
document.body.classList.add(genero === "mulher" ? "genero-mulher" : "genero-homem");

// Saudação baseada na hora
function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

// Aplicar na interface
document.getElementById("username").textContent = nome;
document.getElementById("ano-letivo").textContent = anoLetivo;
document.getElementById("classe").textContent = classe;
document.getElementById("saudacao").textContent = `${saudacao()}, ${nome}!`;

// Carregamento inicial
let disciplinas = JSON.parse(localStorage.getItem(`disciplinas_${userID}`)) || [];

function salvarDisciplinas() {
  localStorage.setItem(`disciplinas_${userID}`, JSON.stringify(disciplinas));
}

function atualizarDisciplinas() {
  
  const container = document.getElementById("disciplinas-container");
  container.innerHTML = "";

  const favoritas = disciplinas.filter(d => d.favorito);
  const normais = disciplinas.filter(d => !d.favorito);
  const todas = [...favoritas, ...normais];

  todas.forEach((disciplina, index) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-disciplina";
    bloco.innerHTML = `
      <div style="position: relative;">
        <span class="nome-disciplina">${disciplina.nome}</span>
        <div class="menu-icone" style="position: absolute; top: 5px; right: 8px;">⋮</div>
        ${disciplina.favorito ? '<div style="position:absolute; bottom:5px; right:5px;">⭐</div>' : ''}
      </div>
    `;

    bloco.onclick = (e) => {
      if (!e.target.classList.contains("menu-icone")) {
        window.location.href = `../Main/Disciplina/disciplina.html?user=${userID}&nome=${encodeURIComponent(disciplina.nome)}`;
      }
    };

    bloco.querySelector(".menu-icone").onclick = (e) => {
      e.stopPropagation();
      mostrarMenu(index, bloco);
    };

    container.appendChild(bloco);
  });
}

function mostrarMenu(index, bloco) {
  document.querySelectorAll(".menu-opcoes").forEach(m => m.remove());

  const menu = document.createElement("div");
  menu.className = "menu-opcoes";
  menu.innerHTML = `
    <button onclick="modificarDisciplina(${index})">Modificar</button>
    <button onclick="removerDisciplina(${index})">Eliminar</button>
    <button onclick="favoritarDisciplina(${index})">${disciplinas[index].favorito ? 'Desfavoritar' : 'Favoritar'}</button>
  `;
  bloco.appendChild(menu);
}

window.modificarDisciplina = function(index) {
  const novoNome = prompt("Novo nome da disciplina:", disciplinas[index].nome);
  if (novoNome?.trim()) {
    disciplinas[index].nome = novoNome.trim();
    salvarDisciplinas();
    atualizarDisciplinas();
  }
};

window.removerDisciplina = function(index) {
  if (window.confirm("Eliminar esta disciplina?")) {
    disciplinas.splice(index, 1);
    salvarDisciplinas();
    atualizarDisciplinas();
  }
};

window.favoritarDisciplina = function(index) {
  disciplinas[index].favorito = !disciplinas[index].favorito;
  salvarDisciplinas();
  atualizarDisciplinas();
};

// Modal
const modal = document.getElementById("modalDisciplina");
const inputNome = document.getElementById("novaDisciplinaNome");
const btnSalvar = document.getElementById("btnSalvarDisciplina");
const btnCancelar = document.getElementById("btnCancelarDisciplina");

// Abrir modal
document.getElementById("btnAdicionarDisciplina").onclick = () => {
  modal.style.display = "flex";
  inputNome.value = "";
  inputNome.focus();
};

// Cancelar
btnCancelar.onclick = () => {
  modal.style.display = "none";
};

// Salvar nova disciplina
btnSalvar.onclick = () => {
  const nomeDisc = inputNome.value.trim();
  if (nomeDisc !== "") {
    disciplinas.push({ nome: nomeDisc, favorito: false });
    salvarDisciplinas();
    atualizarDisciplinas();
    modal.style.display = "none";
  } else {
    alert("Digite o nome da disciplina.");
  }
};

// Fechar modal ao clicar fora
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


document.getElementById("btnLogout").onclick = () => {
  if (confirm("Terminar a sessão atual?")) {
    localStorage.clear();
    window.location.href = "../index.html";
  }
};

// Iniciar
atualizarDisciplinas();
