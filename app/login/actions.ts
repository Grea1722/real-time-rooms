'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const {error} = await supabase.auth.signInWithPassword({email, password});

    if(error){
        //aqui podemos manejar el error con search params
        return redirect("/login?error=Invalid credentials");
    }

    //limpiamox cache para que el proxy vea un nuevo usuario
    revalidatePath("/",'layout');
    redirect("/dashboard");
}

export async function logoutAction(){
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/",'layout');
    return redirect("/login");
}