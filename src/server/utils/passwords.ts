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

export function generateHashForPWReset(password: string) {
  const salt = bcrypt.genSaltSync(11);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function compareHashForPWReset(password: string, hashPassword: string) {
  return bcrypt.compareSync(password, hashPassword);
}

//$2b$12$TcxcZoKr.4CLIX8KsL.Rvuzq1tcu1zdGDJBtdgZKryc1xemiqPjsy
