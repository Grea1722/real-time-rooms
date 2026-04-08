'use server'
import { loginSchema } from "@/lib/validations/loginSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = {error: string | null};

export async function loginAction(prevState: any,formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const validation = loginSchema.safeParse(rawData);
    if(!validation.success){
        return { error: validation.error.issues[0].message };
    }

    const {email, password } = validation.data;

    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword({email, password});

    if(error){
        //aqui podemos manejar el error con search params
        return { error: error.message };
    }

    //limpiamos cache para que el proxy vea un nuevo usuario
    revalidatePath("/","layout");
    redirect("/dashboard");

    return { error: null };
}

export async function guestLoginAction(){
    const supabase = await createClient();

    await supabase.auth.signInWithPassword({
        email: "guest@guest.com",
        password: "123456"
    });
    redirect("/");

    return { error: null };
}

export async function logoutAction(){
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/",'layout');
    return redirect("/login");
}