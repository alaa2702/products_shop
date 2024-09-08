import bcrypt from 'bcryptjs';

const saltRounds = 10;
// Hashing the password before storing it
export const hashPassword = async (password: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return  hashPassword;
};

export const passwordValid = async (password: string, hash: string): Promise<boolean> => {

    return await bcrypt.compare(password, hash);

};
