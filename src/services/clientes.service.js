const repository = require("../repositories/clientes.repository")
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");
const { warn, error } = require("../validations/clienteValidation");
const jwt = require("jsonwebtoken");



exports.login = async (email, senha) => {
    const cliente = await repository.buscarPorEmail(email);

    if (!cliente) {
        throw new Error("Email ou senha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

    if (!senhaCorreta) {
        throw new Error("Email ou senha inválidos")
    }

    const token = jwt.sign(
        {id:cliente.id, email:cliente.email},"segredo_super_guardado", {expiresIn: "1h"}
    );

    return {cliente, token};
}



exports.listar = () => {
    return repository.listar();
};

exports.buscarPorId = (id) => {
    return repository.buscarPorId(id);
};

exports.criar = async (nome, telefone, email, senha) => {

    const senhaHash = await bcrypt.hash(senha, 10)

    const novoCliente = {
        id: uuidv4(),
        nome,
        telefone,
        email,
        senha: senhaHash
    };

    return repository.criar(novoCliente);
};

exports.atualizar = (id, nome, telefone, email) => {
    const cliente = repository.buscarPorId(id);

    if (!cliente) return null;

    if(nome) cliente.nome = nome;
    if (telefone) cliente.telefone = telefone;
    if (email) cliente.email = email;
    


    return repository.atualizar(cliente);
};

exports.deletar = (id) => {
    
    const cliente = repository.buscarPorId(id);

    if (!cliente) return false;

    return repository.deletar(id);
};

/////////////////////////////////


exports.criarAgendamento = (id, data, hora, barbeiro, servico, idCorte) => {

    const agendamentoExistente = repository.verificaDisponibilidadeDeHorario(data, hora, barbeiro, idCorte);

    if (agendamentoExistente) {
        throw new Error("Horário indisponível")
    }
    
    const novoAgendamento = {
        idCorte: uuidv4(),
        id: id,
        data,
        hora,
        barbeiro,
        servico
    };

    return repository.criarAgendamento(novoAgendamento)
};

exports.buscarAgendamentoPorId = (id) => {
    return repository.buscarAgendamentoPorId(id);
};

exports.buscarServicoPorId = (id) => {
    return repository.buscarAgendamentoPorId(id);
};

exports.editarAgendamento = (id, idCorte, data, hora, barbeiro,servico) => {

    
    const agendamento = repository.buscarServicoPorId(idCorte);

    if (!agendamento) return null;

    if (String(agendamento.id) !== String(id)) {
        throw new Error("Acesso não autorizado");
    }

    const novaData = data || agendamento.data;
    const novaHora = hora || agendamento.hora;
    const novoBarbeiro = barbeiro || agendamento.barbeiro;
    
  

    const agendamentoExistente = repository.verificaDisponibilidadeDeHorario(
        novaData,
        novaHora,
        novoBarbeiro,
        idCorte
    );

    if (agendamentoExistente) {
        throw new Error("Horário indisponível")
    }

    if(data) agendamento.data = data;
    if (hora) agendamento.hora = hora;
    if (barbeiro) agendamento.barbeiro = barbeiro;
    if (servico) agendamento.servico = servico;

    console.log("cliente do token: ", id);
    console.log("ID do serviço / agendamento: ", idCorte);

    return repository.editarAgendamento(agendamento);
};