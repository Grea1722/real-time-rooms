'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type ActionState = {
  error: string | null;
}

export async function registerAction(prevState:any, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullname = formData.get("fullname") as string;

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