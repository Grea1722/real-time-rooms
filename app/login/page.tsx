"use client";

import { useActionState, useTransition } from "react";
import { guestLoginAction, loginAction } from "./actions";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
  });
  const [guestState, guestFormAction, isGuestPending] = useActionState(
    guestLoginAction,
    {
      error: null,
    },
  );

  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  const loginAsGuest = () => {
    startTransition(()=> {
      guestFormAction();
    })
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-xl">Iniciar Sesion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("email")}
          type="email"
          placeholder="user@email.com"
          className="border p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="******"
          className="border p-2"
        />
        {errors.password && ( <p className="text-red-500 text-sm">{errors.password.message}</p>)}
        <button
          type="submit"
          className="bg-primary p-2 text-white"
          disabled={isSubmitting || isPending}
        >
          Entrar
        </button>
      </form>

      <hr className="my-8" />

      <button
        onClick={loginAsGuest}
        className="bg-gray-800 text-white p-4 rounded-xl"
        disabled={isGuestPending}
      >
        Entrar como invitado
      </button>
    </div>
  );
};

export default LoginPage;
