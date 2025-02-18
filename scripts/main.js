import ui from "./ui.js"
import api from "./api.js"

async function manipularSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;

    try {
        if (id) {
            await api.editarPensamento({id, conteudo, autoria})
        } else {
            await api.salvarPensamento({conteudo, autoria})
        }
        ui.renderizarPensamentos()
    } catch (error) {
        alert('Erro ao salvar pensamento.')
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
})