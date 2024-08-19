import dotenv from 'dotenv';
import { createUserService } from '../services/users/create-user.service.js';
import { loginUserService } from '../services/users/login-user.service.js';
import { findOneUserById } from '../repositories/user.repository.js';

dotenv.config();

export async function createUser(req, res, next) {
  try {
    const data = req.body;
    const result = await createUserService(data);
    return res.status(200).json({ status: 'success', result: result });
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req, res, next) {
  try {
    const data = req.body;
    const result = await updateUserService(data);
    return res.status(200).json({ status: 'success', result: result });
  } catch (e) {
    next(e);
  }
}

export async function loginUser(req, res, next) {
  try {
    const result = await loginUserService(res, req.body);
    return res.status(200).json({ status: 'success', result: result });
  } catch (e) {
    throw new Error(e.Error);
  }
}

export const statusLogin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  const user = await findOneUserById(req.user._id);
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
  res.status(200).json(user);
};

export function logoutUser(req, res, next) {
  try {
    res.clearCookie('token');
    return res.status(200).json({ status: 'success' });
  } catch (e) {
    throw new Error(e.Error);
  }
}
