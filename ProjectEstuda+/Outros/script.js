// Função para carregar disciplinas do localStorage
function carregarDisciplinas() {
  const lista = document.getElementById("listaDisciplinas");
  lista.innerHTML = ""; // limpa a lista

  const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

  disciplinas.forEach((disciplina, index) => {
    const li = document.createElement("li");
    li.textContent = disciplina;
    lista.appendChild(li);
  });
}

// Função para adicionar nova disciplina
function adicionarDisciplina() {
  const input = document.getElementById("disciplinaInput");
  const novaDisciplina = input.value.trim();

  if (novaDisciplina) {
    let disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
    disciplinas.push(novaDisciplina);
    localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
    input.value = "";
    carregarDisciplinas();
  } else {
    alert("DIGITA O NOME DE UMA DISCIPLINA!");
  }
}

// Evento de clique no botão
document.getElementById("addDisciplina").addEventListener("click", adicionarDisciplina);

// Carregar as disciplinas ao abrir a página
document.addEventListener("DOMContentLoaded", carregarDisciplinas);
// Mostrar/ocultar menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("oculta");
});

