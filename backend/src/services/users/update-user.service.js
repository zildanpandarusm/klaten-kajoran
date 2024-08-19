import bcryptjs from 'bcryptjs';
import { updateUser } from '../../repositories/user.repository.js';

export async function updateUserService(data) {
  const hashedPass = await bcryptjs.hash(data.password, 12);

  const user = {
    username: data.username,
    email: data.email,
    password: hashedPass,
  };

  let result = await updateUser(user);

  return {
    result: result,
  };
}
