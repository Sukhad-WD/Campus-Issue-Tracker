import jwt from 'jsonwebtoken';

// JWT_SECRET is guaranteed to exist: index.ts stops the server at startup if it is missing.
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export default generateToken;
