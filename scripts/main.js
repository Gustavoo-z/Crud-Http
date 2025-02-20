import ui from "./ui.js"
import api from "./api.js"

async function manipularSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    if(!validarData(data)) {
        alert('Não é permitido datas futuras, selecione outra data.')
    }

    try {
        if (id) {
            await api.editarPensamento({id, conteudo, autoria, data})
        } else {
            await api.salvarPensamento({conteudo, autoria, data})
        }
        ui.renderizarPensamentos()
    } catch (error) {
        alert('Erro ao salvar pensamento.')
    }
}

async function manipularInput() {
    const valorBusca = document.getElementById("campo-busca").value;
    try {
        const termoFiltrado = await api.buscarPensamentoTermo(valorBusca);
        debugger
        ui.renderizarPensamentos(termoFiltrado); 
    } catch (error) {
        alert('Erro ao buscar por termo.')
        throw error;   
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos()

    const formulario = document.getElementById('pensamento-form')
    formulario.addEventListener('submit', manipularSubmit)

    const botaoCancelar = document.querySelector('#botao-cancelar');
    botaoCancelar.addEventListener('click', () => {
    document.getElementById("pensamento-form").reset();
    })

    const inputBusca = document.getElementById('campo-busca');
    inputBusca.addEventListener('input', manipularInput);
})

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}