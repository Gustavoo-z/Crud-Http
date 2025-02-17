import ui from "./ui.js";
const URL_BASE = 'http://localhost:3000/'

const api = {
    async buscarPensamentos() {
        try {
            let response = await fetch(`${URL_BASE}pensamentos`)
            response = await response.json();
            if(response.length === 0) {
                ui.apiVazia();
            } 
            return response;
        } catch (error) {
            ui.erroApi();
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