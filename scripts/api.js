import ui from "./ui.js";
const URL_BASE = 'http://localhost:3000/'

const stringParaData = (string) => {
    const [ano, mes, dia] = string.split("-")
    return new Date(Date.UTC(ano, mes - 1, dia))
}

const api = {
    async buscarPensamentos() {
        try {
            let response = await axios.get(`${URL_BASE}pensamentos`)
            const pensamentos = await response.data;
            if(pensamentos.length === 0) {
                ui.apiVazia();
            } 
            return pensamentos.map(pensamento => {
                return {
                    ...pensamento, data: new Date(pensamento.data)
                }
            });
        } catch (error) {
            ui.erroApi();
            throw error
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const data = stringParaData(pensamento.data)
            const response = await axios.post(`${URL_BASE}pensamentos`, {...pensamento, data: data.toISOString()})
            return await response.data;
        } catch (error) {
            alert("Erro ao salvar pensamento.")
            throw error
        }
    },

    async buscarPensamentoId(id) {
        try {
            const response = await axios.get(`${URL_BASE}pensamentos/${id}`)
            const pensamento = await response.data;
            return {
                ...pensamento, data: new Date(pensamento.data)
            }
        } catch (error) {
            alert("Erro ao buscar pensamento.")
            throw error
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}pensamentos/${pensamento.id}`, pensamento)
            return await response.data;
        } catch (error) {
            alert("Erro ao editar pensamento.")
            throw error
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await axios.delete(`${URL_BASE}pensamentos/${id}`)
        } catch (error) {
            alert("Erro ao excluir pensamento.")
            throw error
        }
    },

    async buscarPensamentoTermo(termo) {
        try {
            const termoMinisculo = termo.toLowerCase();
            const pensamentos = await this.buscarPensamentos()

            const pensamentosFiltrados = pensamentos.filter(pensamento => { return (pensamento.conteudo.toLowerCase().includes(termoMinisculo) || pensamento.autoria.toLowerCase().includes(termoMinisculo))   
            })
            return pensamentosFiltrados
        } catch (error) {
            alert('Erro ao buscar pensamento.')
            throw error
        }
    },

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}pensamentos/${id}`, {favorito})
            return await response.data;
        } catch (error) {
            alert('Erro ao favoritar/desfavoritar')
            throw error
        }
    }
}

export default api;