import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_key_here', {
    expiresIn: '30d',
  });
};

export default generateToken;
