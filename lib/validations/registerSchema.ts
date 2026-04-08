import z, { email } from "zod";


export const registerSchema = z.object({
    fullname:z.string().min(3,"Full name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6,"Password must be at least 6 characters long")
});

export type RegisterFormData = z.infer<typeof registerSchema>