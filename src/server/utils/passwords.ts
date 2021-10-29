import * as bcrypt from "bcrypt";
//generateHash ('password123')

export function generateHash(password: string) {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function compareHash(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}
