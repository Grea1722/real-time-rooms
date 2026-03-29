'use client'

import { useState } from "react"
import { loginAction } from "./actions";

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 

    //guest function
    const startLogin =async (email?:string, pass?:string) => {
        const data = new FormData();
        if(email && pass){
            data.append("email", email);
            data.append("password",pass);
            await loginAction(data);
        }
    };

  return (
    <div className="p-10">
        <h2 className="font-bold text-xl">Iniciar Sesion</h2>
      <form action={loginAction} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="user@email.com" className="border p-2" />
        <input type="password" name="password" placeholder="******" className="border p-2" />
        <button type="submit" className="bg-primary p-2 text-white">Entrar</button>
      </form>

      <hr className="my-8"/>

      <button  
      onClick={() => startLogin("guest@email.com", "password1234")}
      className="bg-gray-800 text-white p-4 rounded-xl" >Entrar como invitado</button>

    </div>
  )
}

export default LoginPage
