import bcrypt from "bcrypt";
import auth from "../services/auth.js";
import UserModel from "../Models/UserModel.js"
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

export default {
    login: async(req, res) => {
        const { email } = req.body;
        const { password } = req.body;

        const user = await database.sync().then(async () => {
            const user = await UserModel.findAll({
                where: {
                    email: email
                }
            });
            return user;
        });

        if(user.length == 0) {
            return res.status(400).json(JSON.stringify({
                statusCode: 400,
                statusMsg: "email ou senha incorretos"
            }));
        }

        if(! await bcrypt.compare(password, user[0].dataValues.password)) {
            return res.status(400).json(JSON.stringify({
                statusCode: 400,
                statusMsg: "email ou senha incorretos"
            }));
        }

        return res.status(200).json(JSON.stringify({
            statusCode: 200,
            statusMsg: "ok",
            token: jwt.sign({id: user[0].dataValues.id}, SECRET, {expiresIn: 60 * 60 * 12})
        }));
    },

    create: async(req, res) => {
        const { email } = req.body;
        const { password } = req.body;
        const { name } = req.body;

        if([email, password, name].some((e) => { return e == '' })) {
            return res.status(400).json(JSON.stringify({
                statusCode: 400,
                statusMsg: "preencha todos os dados"
            }))
        }

        const someUser = await database.sync().then(async () => {
            const user = await UserModel.findAll({
                where: {
                    email: email
                }
            });
            return user;
        });

        if(someUser.length > 0) {
            return res.status(401).json(JSON.stringify({
                statusCode: 401,
                statusMsg: "este email já está sendo utilizado"
            }))
        }

        try {
            const newUser = await database.sync().then(async () => {
                const user = await UserModel.create({
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 10)
                })
                console.log("senha: " + await bcrypt.hash(password, 10));
                return user;
            });

            return res.status(200).json(JSON.stringify({
                statusCode: 200,
                statusMsg: "usuário criado com sucesso",
                newUserData: newUser 
            }))
        } catch(err) {
            console.log("Erro ao criar usuário");
            console.log(err);
            return res.status(500).json(JSON.stringify({
                statusCode: 500,
                statusMsg: "erro ao cadastrar, tente novamente mais tarde"
            }));
        }
    },

    delete: async(req, res) => {
        const cryptedToken = req.headers['x-access-token'];
        const token = jwt.decode(cryptedToken);
        console.log(token);
    }
}