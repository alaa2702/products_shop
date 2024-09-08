import { z } from 'zod';

// Schema for user registration
export const userRegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(100, "Password must be less than 100 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[\W_]/, "Password must contain at least one special character."),

});

// Schema for user login
export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password:  z.string().min(8, "Password must be at least 8 characters long."),
});
