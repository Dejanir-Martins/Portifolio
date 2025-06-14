const params = new URLSearchParams(window.location.search);
const nome = params.get('nome') || 'Aula';
const pdf = decodeURIComponent(params.get('pdf') || '');

document.getElementById('nome-aula').textContent = nome;
document.getElementById('pdf-aula').src = pdf;

const linkVerPdf = document.getElementById('ver-pdf');
const wrapperPdf = document.getElementById('pdf-wrapper');

let pdfVisivel = false;

linkVerPdf.addEventListener('click', (e) => {
  e.preventDefault();
  pdfVisivel = !pdfVisivel;
  wrapperPdf.style.display = pdfVisivel ? "block" : "none";
  linkVerPdf.textContent = pdfVisivel ? "📕 Ocultar PDF" : "📄 Ver Aula em PDF";
});
// Carrega o PDF salvo, se existir
const pdfSalvo = localStorage.getItem(`pdf-${nome}`);
if (pdfSalvo) {
  document.getElementById('pdf-aula').src = pdfSalvo;
}

// Atualiza o PDF ao enviar novo
document.getElementById("form-pdf").addEventListener("submit", function (e) {
  e.preventDefault();
  const file = document.getElementById("pdf-upload").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const pdfBase64 = event.target.result;
      document.getElementById('pdf-aula').src = pdfBase64;
      localStorage.setItem(`pdf-${nome}`, pdfBase64);
      alert("📄 PDF atualizado com sucesso!");
    };
    reader.readAsDataURL(file);
  }
});


// Notas (salvas no localStorage)
const notasKey = `notas-${nome}`;
const notasArea = document.getElementById('notas');
notasArea.value = localStorage.getItem(notasKey) || '';

notasArea.addEventListener('input', () => {
  localStorage.setItem(notasKey, notasArea.value);
});

// Botão de voltar
document.getElementById('btn-voltar').addEventListener('click', () => {
  window.history.back();
});

// Lista de tarefas
let tarefas = JSON.parse(localStorage.getItem(`tarefas-${nome}`)) || [];

function atualizarListaTarefas() {
  const ul = document.getElementById('lista-tarefas');
  ul.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" ${tarefa.concluida ? "checked" : ""}>
        ${tarefa.descricao} – <small>${tarefa.dataEntrega}</small>
        ${tarefa.lembrete ? '🔔' : ''}
      </label>
    `;

    li.querySelector("input").addEventListener("change", (e) => {
      tarefas[index].concluida = e.target.checked;
      salvarTarefas();
    });

    ul.appendChild(li);
  });
}

function salvarTarefas() {
  localStorage.setItem(`tarefas-${nome}`, JSON.stringify(tarefas));
  atualizarListaTarefas();
}

// Mostrar painel de tarefa
document.getElementById("btnAdicionarTarefa").addEventListener("click", () => {
  document.getElementById("painel-tarefa").classList.remove("oculto");
});

// Cancelar tarefa
document.getElementById("cancelar-tarefa").addEventListener("click", () => {
  document.getElementById("form-tarefa").reset();
  document.getElementById("painel-tarefa").classList.add("oculto");
});

// Submeter nova tarefa
document.getElementById("form-tarefa").addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao-tarefa").value;
  const dataEntrega = document.getElementById("data-entrega").value;
  const lembrete = document.getElementById("ativar-lembrete").checked;

  tarefas.push({
    descricao,
    dataEntrega,
    lembrete,
    concluida: false
  });

  salvarTarefas();

  document.getElementById("form-tarefa").reset();
  document.getElementById("painel-tarefa").classList.add("oculto");
});

atualizarListaTarefas();
