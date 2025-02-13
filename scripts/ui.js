import api from "./api.js"

const ui = {
    async renderizarPensamentos() {
        const listaPensamentos = document.querySelector('#lista-pensamentos')

        try {
            const pensamentos = await api.buscarPensamentos()
            pensamentos.forEach(ui.adicionarPensamentoNaLista)    
        } catch (error) {
            
        }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.querySelector('#lista-pensamentos')
        const li = document.createElement('li')
        li.setAttribute('data-id', pensamento.id)
        li.classList.add('li-pensamento')

        const iconeAspas = document.createElement('img')
        iconeAspas.src = 'assets/imagens/aspas-azuis.png'
        iconeAspas.alt = 'Aspas azuis'
        iconeAspas.classList.add('icone-aspas')

        const divPensamento = document.createElement('div')
        divPensamento.classList.add('pensamento-conteudo')
        divPensamento.textContent = pensamento.conteudo

        const divAutoria = document.createElement('div')
        divAutoria.classList.add('pensamento-autoria')
        divAutoria.textContent = pensamento.autoria

        li.appendChild(iconeAspas)
        li.appendChild(divPensamento)
        li.appendChild(divAutoria)
        listaPensamentos.appendChild(li)
    }
}

export default ui;