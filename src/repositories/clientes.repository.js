let clientes = [];

let agendamentos = [];

exports.listar = () => {
    return clientes;
};



exports.buscarPorEmail = (email) => {
    return clientes.find(c => c.email === email);
}



exports.buscarPorId = (id) => {
    return clientes.find(c => c.id === id);
};




exports.criar = (cliente) => {
    clientes.push(cliente);
    return cliente;
};



exports.atualizar = (cliente) => {
    return cliente;
};



exports.deletar = (id) => {
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) return false;

    clientes.splice(index, 1);
    return true;
};

/////////////////////////////////////////////////////////////

exports.criarAgendamento = (agendamento) => {

    agendamentos.push(agendamento);
    return agendamento;

};

exports.buscarAgendamentoPorId = (id) => {
    return agendamentos.find(a => a.id === id);
};

exports.buscarServicoPorId = (idCorte) => {
    return agendamentos.find(a => a.idCorte === idCorte);
};



exports.verificaDisponibilidadeDeHorario = (data, hora, barbeiro, idCorte) => {
    return agendamentos.find(a => 
        a.data === data && 
        a.hora === hora && 
        a.barbeiro === barbeiro && 
        a.idCorte !== idCorte
    );
};



exports.editarAgendamento = (agendamentoAtualizado) => {
    const index = agendamentos.findIndex(a => a.idCorte === agendamentoAtualizado.idCorte);

    if (index !== -1) {
        agendamentos[index] = agendamentoAtualizado;
        return agendamentos[index];
    }
    return null;
};