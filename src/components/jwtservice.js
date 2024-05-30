import { SignJWT } from 'jose';

const secretKey = new TextEncoder().encode('secretkey');

const createToken = async (payload) => {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretKey);
    return jwt;
};

export default createToken;
