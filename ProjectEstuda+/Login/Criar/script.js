function gerarSugestoesNome() {
  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const divSugestoes = document.getElementById("sugestoes-nome");
  const opcoesContainer = document.getElementById("opcoes-nome");
  const btnProximo = document.getElementById("btnEtapa1");

  if (nome || sobrenome) {
    const sugestoes = [
      nome.toLowerCase() + sobrenome.toLowerCase(),
      nome.toLowerCase() + Math.floor(Math.random() * 1000),
      sobrenome.toLowerCase() + "_" + nome.toLowerCase()
    ];
idade
    opcoesContainer.innerHTML = "";
    sugestoes.forEach(sugestao => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = sugestao;
      btn.onclick = () => {
        document.getElementById("nomeUsuario").value = sugestao;
        Array.from(opcoesContainer.children).forEach(b => b.classList.remove("selecionado"));
        btn.classList.add("selecionado");
        btnProximo.disabled = false;
      };
      opcoesContainer.appendChild(btn);
    });

    divSugestoes.style.display = "block";
  } else {
    divSugestoes.style.display = "none";
    btnProximo.disabled = true;
  }
}

function mostrarEtapa(num) {
  const etapas = document.querySelectorAll(".form-step");
  etapas.forEach((etapa, i) => {
    etapa.style.display = (i === num - 1) ? "block" : "none";
  });
}

function voltarEtapa(n) {
  mostrarEtapa(n);
}

function salvarEtapa1() {
  localStorage.setItem("nome", document.getElementById("nome").value);
  localStorage.setItem("sobrenome", document.getElementById("sobrenome").value);
  localStorage.setItem("nomeUsuario", document.getElementById("nomeUsuario").value);
  mostrarEtapa(2);
}

function salvarEtapa2() {
  localStorage.setItem("idade", document.getElementById("idade").value);
  if(document.getElementById("idade") < 0 ){
    console.log("Idade inválida para login")
  }
  localStorage.setItem("sexo", document.getElementById("sexo").value);
  mostrarEtapa(3);
}

function salvarEtapa3() {
  localStorage.setItem("ensino", document.getElementById("ensino").value);
  localStorage.setItem("classe", document.getElementById("classe").value);
  mostrarEtapa(4);
}

function salvarEtapa4() {
  localStorage.setItem("disciplinas", document.getElementById("disciplinas").value);
  mostrarEtapa(5);
}

function salvarSenha() {
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmarSenha").value;

  if (senha !== confirmar) {
    alert("As senhas não coincidem!");
    return;
  }

  localStorage.setItem("senha", senha);
  mostrarResumo();
}

function mostrarResumo() {
  const resumo = `
Nome: ${localStorage.getItem("nome")} ${localStorage.getItem("sobrenome")}
Usuário: ${localStorage.getItem("nomeUsuario")}
Idade: ${localStorage.getItem("idade")}
Sexo: ${localStorage.getItem("sexo")}
Ensino: ${localStorage.getItem("ensino")}
Classe: ${localStorage.getItem("classe")}
Disciplinas: ${localStorage.getItem("disciplinas")}
Senha definida com sucesso!
  `;
  document.getElementById("resumo").textContent = resumo;
  mostrarEtapa(6);
}
