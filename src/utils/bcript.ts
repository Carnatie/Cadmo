import * as bcrypt from 'bcrypt';

export async function cryptPassword(password: string) {
  const salt = await bcrypt.genSalt();

  return bcrypt.hashSync(password, salt);
}
