// Lê o nome da disciplina da URL
const urlParams = new URLSearchParams(window.location.search);
const nomeDisciplina = urlParams.get('nome') || 'Disciplina';

// Mostra o nome da disciplina na interface
document.getElementById('disciplina-nome').textContent = nomeDisciplina;
document.getElementById('titulo-disciplina').textContent = `AULAS DE ${nomeDisciplina.toUpperCase()}`;

// Lista de aulas temporária
let aulas = [
  { nome: "Introdução", data: "2025-05-01" },
  { nome: "Capítulo 1", data: "2025-05-03" }
];

// Atualiza a lista de aulas na tela
function atualizarAulas() {
  const container = document.getElementById("aulas-container");
  container.innerHTML = "";

  aulas.forEach((aula) => {
    const bloco = document.createElement("div");
    bloco.className = "aula-bloco";
    bloco.innerHTML = `<strong>${aula.nome}</strong><br><small>${aula.data}</small>`;

    // Abre a página da aula ao clicar
    bloco.onclick = () => {
      window.location.href = `../Disciplina/Aula/aula.html?nome=${encodeURIComponent(aula.nome)}&pdf=${encodeURIComponent(aula.pdf || '')}`;
    };

    container.appendChild(bloco);
  });
}

// Adiciona uma nova aula à lista
function adicionarAula(nome, dataHoje, pdfData = '') {
  aulas.push({ nome, data: dataHoje, pdf: pdfData });
  atualizarAulas();
  document.getElementById("form-aula").reset();
  document.getElementById("painel-aula").classList.add("oculto");
}

// Botão "Voltar" para a página principal
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.location.href = '../main.index.html';
});

// Botão "Adicionar Aula" mostra o painel flutuante
document.getElementById("btnAdicionarAula").addEventListener("click", () => {
  document.getElementById("painel-aula").classList.remove("oculto");
});

// Botão "Cancelar" fecha o painel
document.getElementById("cancelar-aula").addEventListener("click", () => {
  document.getElementById("form-aula").reset();
  document.getElementById("painel-aula").classList.add("oculto");
});

// Lida com o envio do formulário da nova aula
document.getElementById("form-aula").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome-aula").value.trim();
  const pdfFile = document.getElementById("pdf-aula").files[0];
  const dataHoje = new Date().toISOString().split('T')[0];
  

  if (!nome) {
    alert("Indica o nome da aula.");
    return;
  }

  if (pdfFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const pdfDataUrl = event.target.result;
      adicionarAula(nome, dataHoje, pdfDataUrl);
    };
    reader.readAsDataURL(pdfFile);
  } else {
    adicionarAula(nome, dataHoje);
  }
});

// Inicializa a página com as aulas
atualizarAulas();
