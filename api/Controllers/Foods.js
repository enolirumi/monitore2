import fs from 'fs'

export default {
    buscaAlimento: async (nomeAlimento) => {
        const listaAlimentosJSON = fs.readFile('../AlimentosData/AlimentosLista.json', 'utf8', async (res) => {
            const listaALimentos = await JSON.parse(res)
            console.log(listaALimentos)

            const resultado = listaALimentos.filter(e => {
                if (e.description.toLowerCase().includes(nomeAlimento.toLowerCase())) {
                    return e
                }
            });
            return resultado
        })
    }
}