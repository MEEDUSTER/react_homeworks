import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Ім'я занадто коротке"),
    email: z.string().email("Некоректний email"),
    password: z.string().min(8, "Мінімум 8 символів"),
    passwordComfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordComfirm, {
    message: "Паролі не збігаються",
    path: ["passwordComfirm"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
