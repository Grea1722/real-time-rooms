'use client'
import { useActionState, useState } from "react";
import { registerAction } from "./actions";

const RegisterPage = () => {
  //state: manage loading and error states
  //formAction: handle form submission and call the server action
  //isPending: disable the submit button while the registration is in progress
  const [state, formAction, isPending] = useActionState(registerAction, { error: null });


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      
      <form
        action={formAction}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border-slate-100 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Register
        </h2>
        <input type="text" name="fullname" placeholder="Full Name" />
        <input type="email" name="email" placeholder="user@email.com" />
        <input type="password" name="password" placeholder="******" />

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg"
          disabled={isPending}

        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
