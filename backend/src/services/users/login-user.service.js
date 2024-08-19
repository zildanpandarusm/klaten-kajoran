import bcryptjs from 'bcryptjs';
import { findOneUser } from '../../repositories/user.repository.js';
import jwt from 'jsonwebtoken';

export async function loginUserService(res, data) {
  const user = await findOneUser(data.email);

  const isPasswordValid = await bcryptjs.compare(data.password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({
      error: 'Invalid login',
    });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
  });

  return {
    token: token,
  };
}
