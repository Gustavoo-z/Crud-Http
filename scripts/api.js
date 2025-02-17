const URL_BASE = 'http://localhost:3000/'

const api = {
    async buscarPensamentos() {
        try {
            debugger
            let response = await fetch(`${URL_BASE}pensamentos`)
            response = await response.json();
            if(response.length === 0) {
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
            } 
            return response;
        } catch (error) {
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
            throw error
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            alert("Erro ao salvar pensamento.")
            throw error
        }
    },

    async buscarPensamentoId(id) {
        try {
            const response = await fetch(`${URL_BASE}pensamentos/${id}`)
            return await response.json();
        } catch (error) {
            alert("Erro ao buscar pensamento.")
            throw error
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            alert("Erro ao editar pensamento.")
            throw error
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await fetch(`${URL_BASE}pensamentos/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            alert("Erro ao excluir pensamento.")
            throw error
        }
    }
}

export default api;