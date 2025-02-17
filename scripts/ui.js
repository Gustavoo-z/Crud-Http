import api from "./api.js"

const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoId(pensamentoId)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.querySelector('#lista-pensamentos')
        listaPensamentos.innerHTML = ''
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

        const botaoEditar = document.createElement('button')
        botaoEditar.classList.add('botao-editar')
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id)

        const iconeEditar = document.createElement('img')
        iconeEditar.src = 'assets/imagens/icone-editar.png'
        iconeEditar.alt = 'Editar'
        botaoEditar.appendChild(iconeEditar)

        const botaoExcluir = document.createElement('button')
        botaoExcluir.classList.add('botao-excluir')
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                ui.renderizarPensamentos()
            } catch (error) {
                alert('Erro ao excluir pensamento.')
            }
        }

        const iconeExcluir = document.createElement('img')
        iconeExcluir.src = 'assets/imagens/icone-excluir.png'
        iconeExcluir.alt = 'Excluir'
        botaoExcluir.appendChild(iconeExcluir)

        const icones = document.createElement('div')
        icones.classList.add('icones')
        icones.appendChild(botaoEditar)
        icones.appendChild(botaoExcluir)

        li.appendChild(iconeAspas)
        li.appendChild(divPensamento)
        li.appendChild(divAutoria)
        li.appendChild(icones)
        listaPensamentos.appendChild(li)
    },

    apiVazia() {
        const listaPensamentos = document.getElementById('lista-pensamentos')
        const divMural = document.createElement('div')
        divMural.classList.add('center')
        const imgVazio = document.createElement('img')
        imgVazio.src = 'assets/imagens/lista-vazia.png'
        imgVazio.classList.add('center')
        const paragrafoImg = document.createElement('p')
        paragrafoImg.innerText = 'Nada por aqui ainda, que tal compartilhar alguma ideia?'
        
        listaPensamentos.appendChild(divMural)
        divMural.appendChild(paragrafoImg)
        divMural.appendChild(imgVazio)
        
        const pensamentoForm = document.getElementById('pensamento-form')
        pensamentoForm.classList.add('hidden')

        const containerForm = document.getElementById('form-container')
        const botaoPensamento = document.createElement('button')
        botaoPensamento.innerText = 'Adicionar pensamentos'
        botaoPensamento.classList.add('botao-add')
        containerForm.style.background = 'transparent'
        containerForm.style.boxShadow = 'none'
        containerForm.appendChild(botaoPensamento)

        botaoPensamento.addEventListener('click', () => {
        pensamentoForm.classList.remove('hidden')
        containerForm.style.background = '#FFF'
        containerForm.style.boxShadow = '8px 8px 20px 0px rgba(4, 24, 50, 0.08'
        botaoPensamento.classList.add('hidden')
        })

    },

    erroApi() {
        const listaPensamentos = document.querySelector('#lista-pensamentos')
        const paragrafoPensamento = document.createElement('p')
        paragrafoPensamento.classList.add('paragrafo-pensamento')
        paragrafoPensamento.innerText = 'Impossível exibir os pensamentos no momento, verifique sua conexão de rede ou se a API foi iniciada corretamente.'
        listaPensamentos.appendChild(paragrafoPensamento)
        
        const pensamentoForm = document.getElementById('pensamento-form')
        pensamentoForm.classList.add('hidden')
        
        const paragrafoForm = document.createElement('p')
        paragrafoForm.classList.add('paragrafo-pensamento')
        paragrafoForm.innerText = 'Impossível criar novos pensamentos no momento, verifique sua conexão de rede ou se a API foi iniciada corretamente.'
        const containerForm = document.getElementById('form-container')
        containerForm.appendChild(paragrafoForm)
    }
}

export default ui;