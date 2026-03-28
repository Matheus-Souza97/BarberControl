const service = require("../services/clientes.service");
const {v4: uuidv4} = require("uuid");


exports.login = async (req, res) => {
    const {email, senha} = req.body;

    const cliente = await service.login(email, senha);

    res.json(cliente);
}



exports.listar = (req, res) => {
    const clientes = service.listar();
    res.json(clientes);
};



exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    
    ///if (isNaN(id)) {
       /// return res.status(400).json({ erro: "ID deve ser numero" });
    ///}
    if (String(agendamento.id) !== String(id)) {
    throw new Error("Acesso não autorizado");}

    const cliente = service.buscarPorId(id);

    if (!cliente) {
        return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    res.json(cliente);
};



exports.criar = async (req, res, next) => {
    try{
        
        const {nome, telefone, email, senha} = req.body
        
        const novoCliente = await service.criar(nome, telefone, email, senha);

        res.status(201).json(novoCliente);

    } catch (err) {
        next(err);
    }
    
};



exports.atualizar = (req, res) => {
    const id = req.params.id;
    const {nome, telefone} = req.body;
    
    const clienteAtualizado = service.atualizar(id, nome, telefone);

    if (!clienteAtualizado) {
        return res.status(404).json({ erro: "Cliente não encontrado"});
    }

    res.json(clienteAtualizado);
};



exports.deletar = (req, res) => {
    const id = req.params.id;

    const deletado = service.deletar(id);

    if (!deletado) {
        return res.status(404).json({ erro: "Cliente não encontrado"});
    }
    console.log("Deletado com Sucesso!")
    res.status(200).json({mensagem: "Deletado com Sucesso!"});
};



//////////////////////////////////////////////////////////////////////


exports.criarAgendamento = (req, res, next) => {
    try{
        
        const {data, hora, barbeiro, servico} = req.body

        const id = req.id

        if (!data || !hora || !barbeiro || !servico) {
            return res.status(400).json({erro: "Preencha todos os campos" });
        }

        const novoAgendamento = service.criarAgendamento(id, data, hora, barbeiro, servico);

        res.status(201).json(novoAgendamento);

    } catch (err) {
        next(err);
    }
    
};

exports.buscarAgendamentoPorId = (req, res) => {
    const id = req.params.id;

    const agendamento = service.buscarAgendamentoPorId(id);

    if (!agendamento) {
        return res.status(404).json({ erro: "agendamento não encontrado" });
    }
    res.json(agendamento);
};


exports.editarAgendamento = (req, res) => {
    try{
        const id = req.id;
        const idCorte = req.params.idCorte;

        const {data, hora, barbeiro, servico} = req.body;
        
        const agendamentoEditado = service.editarAgendamento(
            id, 
            idCorte, 
            data, 
            hora, 
            barbeiro, 
            servico
        );

        if (!agendamentoEditado) {
            return res.status(404).json({ erro: "Agendamento não encontrado"});
        }

        res.json(agendamentoEditado);
    }catch (err) {
        return res.status(400).json({ erro: err.message });
    }
};