import ui from "./ui.js"
import api from "./api.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos()

    const formulario = document.getElementById('pensamento-form')
    formulario.addEventListener('submit', manipularSubmit)
})

async function manipularSubmit(event) {
    event.preventDefault(); //Resolver preventDefault
    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;

    console.log("Conteúdo:", conteudo, "Autoria:", autoria);

    try {
        await api.salvarPensamento({conteudo, autoria})
        ui.renderizarPensamentos()
    } catch (error) {
        alert('Erro ao salvar pensamento.')
    }
}