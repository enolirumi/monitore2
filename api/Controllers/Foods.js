import fs from 'fs';

export default {
    getSomeFood: async (foodName) => {
        try {
            const foods = fs.readFile('../services/FoodsData/AlimentosLista.json', 'utf8', async (res) => {
                const listaALimentos = await JSON.parse(res)
                console.log(listaALimentos)
    
                return listaALimentos.filter(e => {
                    if (e.description.toLowerCase().includes(foodName.toLowerCase())) {
                        return e
                    }
                });
            })
            return {
                data: foods,
                statusCode: 200,
                statusMsg: 'Ok'
            }
        } catch(err) {
            console.log(err);
            return {
                data: {},
                statusCode: 500,
                statusMsg: 'Ocorreu um erro ao buscar os alimentos, tente novamente mais tarde!'
            }
        }
        
    },
    getAllFoods: async () => {

        try {
            const result = await fs.readFile('../services/FoodsData/AlimentosLista.json', 'utf8', async (res) => {
                return await JSON.parse(res)
            })
            return {
                data: result,
                statusMsg: 'Ok',
                statusCode: 200,
            }
        } catch(err) {
            console.log(err);
            return {
                data: {},
                statusCode: 500,
                statusMsg: 'Ocorreu um erro ao buscar os alimentos, tente novamente mais tarde!'
            }
        }
    }
}