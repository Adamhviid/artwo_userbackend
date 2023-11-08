import jwt from 'jsonwebtoken';

export default async function VerifyToken(req, res, next) {
    try {
        const verify = jwt.verify(req.headers.token, process.env.JWT_TOKEN_SECRET);

        if (verify) {
            req.user = verify;
            return next();
        }

    } catch (e) {
        return res.status(401).json("Ugyldig token");
    }

}