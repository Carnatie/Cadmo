import * as bcrypt from 'bcrypt';

export async function cryptPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(password, salt);
}

export async function comparePassword(
  password: string,
  userPasword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, userPasword);
}
