import jwt from "jsonwebtoken";

//NOTE: Pode ser que não importar o dotenv aqui dê problema

const SECRET = process.env.SECRET

export default {
    tokenVerify: async (req, res, next) => {

        const token = req.headers["x-access-token"]

        if (!token) {
            return res.status(401).json(JSON.stringify({
                statusCode: 401,
                statusMsg: "não autorizado"
            }))
        }

        try {
            const decryptedToken = jwt.verify(token, SECRET);
            req.token = decryptedToken;
            console.log(`infoToken: ${req.token}`);
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(JSON.stringify({
                statusCode: 401,
                statusMsg: "token inválido"
            }))
        }
    }
}