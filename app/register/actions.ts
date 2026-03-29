'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName },
emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback` },
  });


  if(error) {
    return {error: error.message};
  }

  redirect("/")
}