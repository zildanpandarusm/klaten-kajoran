import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
