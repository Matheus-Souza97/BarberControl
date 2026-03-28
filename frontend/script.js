const API = "http://localhost:3000/clientes";

async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch(API + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.erro || "Email ou senha inválidos!");
        return;
    }

    if (!dados.token) {
        alert("Erro ao fazer login!");
        return;
    }

    localStorage.setItem("token", dados.token);

    alert("Login realizado!");

    window.location.href = "agendamentos.html"
};

function irParaCadastro() {
    window.location.href = "cadastro.html";
}





async function criarConta() {

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome,
            telefone,
            email,
            senha
        })
    });

    const dados = await resposta.json();

    alert("Conta criada com sucesso!");

    window.location.href = "login.html";
}





async function agendar() {

    const token = localStorage.getItem("token");

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const servico = document.getElementById("servico").value;
    

    const resposta = await fetch(API + "/agendamentos/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify({
            data,
            hora,
            barbeiro,
            servico
        })

    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.erro || "Agendamento indisponivel");
        return ;
    }

    alert("Agendamento criado!");

    adicionarNaTela(dados);

};


function adicionarNaTela(agendamento) {

    const tituloTelaDeAgendamento = document.getElementById("tituloTelaDeAgendamento");
    const resumo = document.getElementById("textContent");


    tituloTelaDeAgendamento.classList.add("resumoAgendamento")
    tituloTelaDeAgendamento.innerHTML = '<h2>Agendamentos</h2>';

    const agendamentoExistente = document.getElementById(`card-${agendamento.idCorte}`);

    resumo.classList.add("textContent")
    const conteudoHTML = `
        <p>
            ${agendamento.data} - ${agendamento.hora} <br>
            ${agendamento.barbeiro} - ${agendamento.servico}
        </p>
        <button onclick="editarAgendamento('${agendamento.idCorte}', 
        '${agendamento.data}', 
        '${agendamento.hora}', 
        '${agendamento.barbeiro}', 
        '${agendamento.servico}')">Alterar</button>
        <button onclick="cancelarAgendamento('${agendamento.idCorte}')">Desmarcar</button>
        <hr>`;

    if (agendamentoExistente) {
        // Se já existe (edição), apenas atualiza o conteúdo daquela div
        agendamentoExistente.innerHTML = conteudoHTML;
    } else {
        // Se é novo, cria uma nova div e adiciona ao resumo
        const novaDiv = document.createElement("div");
        novaDiv.id = `card-${agendamento.idCorte}`;
        novaDiv.className = "agendamento-item";
        novaDiv.innerHTML = conteudoHTML;
        resumo.appendChild(novaDiv);
    }
    const tituloNovoAgendamento = document.getElementById("tituloNovoAgendamento");
    tituloNovoAgendamento.innerHTML = `<h2 id="tituloNovoAgendamento">Novo Agendamento</h2>`;

    limparFormulario()

}

async function editarAgendamento(idCorte, data, hora, barbeiro, servico) {
    
    
    agendamentoEditando = idCorte;

    document.getElementById("data").value = data;
    document.getElementById("hora").value = hora;
    document.getElementById("barbeiro").value = barbeiro;
    document.getElementById("servico").value = servico;

    document.getElementById("botaoSalvar").innerText = "Atualizar";

    const tituloNovoAgendamento = document.getElementById("tituloNovoAgendamento");
    tituloNovoAgendamento.innerHTML = `<h2 id="tituloNovoAgendamento">Atualizar Agendamento</h2>`;

    const containerBotao = document.getElementById("containerCancelar"); 
    containerBotao.innerHTML = `
    <button id="containerCancelar"onclick="cancelarEdicao()">Cancelar edição</button>
`;
}

async function cancelarEdicao() {

    const tituloNovoAgendamento = document.getElementById("tituloNovoAgendamento");
    tituloNovoAgendamento.innerHTML = `<h2 id="tituloNovoAgendamento">Novo Agendamento</h2>`;

    const containerBotao = document.getElementById("containerCancelar");

    containerBotao.innerHTML = "";
    limparFormulario();

    
}









// 🔥 controle global (quem está sendo editado)
let agendamentoEditando = null;

// 🔥 função principal (criar ou editar)
async function salvar() {
    if (agendamentoEditando) {
        await alterarAgendamento();
    } else {
        await agendar();
    }
}






async function alterarAgendamento() {

    const token = localStorage.getItem("token");

    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const servico = document.getElementById("servico").value;

    const resposta = await fetch(API + "/agendamentos/" + agendamentoEditando, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            data,
            hora,
            barbeiro,
            servico
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        alert(dados.erro || "Erro ao atualizar");
        return;
    }

    alert("Agendamento atualizado!");

    agendamentoEditando = null;
    document.getElementById("botaoSalvar").innerText = "Agendar";

    adicionarNaTela(dados);
}



 async function cancelarAgendamento(idCorte) {

    const token = localStorage.getItem("token");

    const resposta = await fetch(API + "/agendamentos/" + idCorte, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (!resposta.ok) {
        alert("Erro ao cancelar");
        return;
    }

    alert("Agendamento cancelado!");

    location.reload();
}

// =========================
// 🧹 LIMPAR FORM
// =========================
function limparFormulario() {
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("barbeiro").value = "";
    document.getElementById("servico").value = "";
}