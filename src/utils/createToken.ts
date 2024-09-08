//create token utility using jsonwebtoken
import jwt from "jsonwebtoken";



export const createToken = (id: number, role: string) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return token;
};
