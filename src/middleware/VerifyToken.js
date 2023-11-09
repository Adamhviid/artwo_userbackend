import jwt from 'jsonwebtoken';

export default async function verifyToken(req, res, next) {
    try {
        const verification = jwt.verify(req.headers.token, process.env.JWT_TOKEN_SECRET);

        if (verification) {
            req.user = verification;
            return next();
        }

    } catch (e) {
        return res.status(401).json("Ugyldig token");
    }

}