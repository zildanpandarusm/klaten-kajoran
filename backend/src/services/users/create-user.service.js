import bcrypt from 'bcrypt';
import { createUser } from '../../repositories/user.repository.js';

export async function createUserService(data) {
  const hashedPass = await bcrypt.hash(data.password, 12);

  const user = {
    username: data.username,
    email: data.email,
    password: hashedPass,
  };

  let result = await createUser(user);

  return {
    result: result,
  };
}
