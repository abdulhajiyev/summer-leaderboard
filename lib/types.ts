import { z } from "zod";

export const SignUpSchema = z.object({
	email: z.string().email("Yanlış email adresi"),
	password: z.string().min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır"),
	name: z.string().min(1, "Ad tələb olunur"),
});

export const LoginSchema = z.object({
	email: z.string().email("Yanlış email adresi"),
	password: z.string().min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır"),
});
