import bcryptjs from 'bcryptjs';
import { createUser } from '../../repositories/user.repository.js';

export async function createUserService(data) {
  // Use bcryptjs instead of bcrypt
  const hashedPass = await bcryptjs.hash(data.password, 12);

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
