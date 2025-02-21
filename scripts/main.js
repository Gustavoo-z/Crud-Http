import ui from "./ui.js"
import api from "./api.js"

function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '')
}

const regexConteudo = /^[A-Za-z\s]{10,}$/
const regexAutoria = /^[A-Za-z]{3,15}$/

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo)
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria)
}

async function manipularSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    const conteudoSemEspacos = removerEspacos(conteudo)
    const autoriaSemEspacos = removerEspacos(autoria)

    if(!validarConteudo(conteudoSemEspacos)) {
        alert('Conteúdo: Insira no minímo 10 caracteres válidos.')
        return;
    }

    if(!validarAutoria(autoriaSemEspacos)) {
        alert('Autoria: Insira de 3 a 15 caracteres válidos.')
        return;
    }

    if(!validarData(data)) {
        alert('Data: Não é permitido datas futuras, selecione outra data.')
        return;
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