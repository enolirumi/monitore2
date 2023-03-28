import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import user from "./Controllers/User.js"
import auth from './services/auth.js';

const app = express();
const port = 8080;

app.use(cors);
app.use(express.json())

app.get(`/`, (req, res) => {
    console.log(`bateu aq`);
    return res.status(200).json(JSON.stringify({
        msg: "Bem-vindo"
    }))
})

// ROTAS AUTH

app.post(`/login`, (req, res) => {
    user.login(req, res)
})

// FIM ROTAS AUTH
// ROTAS USER

app.post(`/user`, (req, res) => {
    user.create(req, res)
});
app.delete(`/user`, async (req, res, next) => await auth.tokenVerify(req, res, next), (req, res) => {
    user.delete(req, res)
});

// FIM ROTAS USUARIO

app.listen(port, () => {

})