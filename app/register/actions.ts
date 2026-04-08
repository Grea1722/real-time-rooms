'use server'
import { registerSchema } from "@/lib/validations/registerSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type ActionState = {
  error: string | null;
}

export async function registerAction(prevState:any, formData: FormData) {
  //get form data and validate it using zod schema
  const rawData = Object.fromEntries(formData.entries());

  const validation = registerSchema.safeParse(rawData);
  if(!validation.success){
    //return the first error message to the client
    return { error: validation.error.issues[0].message };
  }

  //if validation is successful, extract the validated data
  const { fullname, email, password } = validation.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullname },
emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback` },
  });


  if(error) {
    return { error: error.message};
  }

  redirect("/")

  return {error: null};
}