"use client";

import { useActionState, useTransition } from "react";
import { guestLoginAction, loginAction } from "./actions";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Label } from "@/components/ui/label";

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
    startTransition(() => {
      guestFormAction();
    });
  };

  return (
    <div className="bg-gray-100 flex flex-col md:flex-row items-center gap-10 w-full justify-between h-screen ">
      <div className="flex flex-col h-full w-2/5 align-center p-10">
        {" "}
        <h2 className="font-bold text-xl mb-20">Realtime Room Monitor</h2>
        <br />
        <div className="my-10 mx-auto  w-3/5">
          <h3 className="text-3xl font-bold">Welcome Back</h3>
          <p className="text-lg text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center "
        >
          <div className="mb-2 mx-auto w-3/5">
            <Label htmlFor="email" className="mb-3">
              EMAIL ADDRESS
            </Label>
            <input
              {...register("email")}
              type="email"
              placeholder="user@email.com"
              className="border p-2  rounded-md border-slate-300 bg-white w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-2 mx-auto w-3/5">
            <Label htmlFor="password" className="mb-3 ">
              PASSWORD
            </Label>
            <input
              {...register("password")}
              type="password"
              placeholder="******"
              className="border p-2  rounded-md border-slate-300 bg-white w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black p-2 text-white rounded-xl h-15 cursor-pointer w-3/5 mx-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || isPending}
          >
            Entrar
          </button>
        </form>
        <div className="flex items-center gap-2 my-10">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <button
          onClick={loginAsGuest}
          className="bg-gray-800 text-white p-4 rounded-xl w-3/5 mx-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isGuestPending}
        >
          Entrar como invitado
        </button>
      </div>
      <div className="relative w-3/5 h-full rounded-lg overflow-hidden">
        <Image
          src="/hotelReception.jpg"
          alt="Login Illustration"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center pl-30 text-white w-2/4">
          <p className="text-md tracking-widest uppercase text-yellow-500 mb-4">
            The Digital Concierge
          </p>
          <h2 className="text-6xl font-bold leading-tight mb-6">
            Elevating Hospitality to an <em>Art Form.</em>
          </h2>
          <div className="w-10 h-0.5 bg-yellow-400 mb-6" />
          <blockquote className="text-md italic text-white/80">
            Luxury is not just about the space, but the invisible service that
            anticipates every guest's desire before it's even felt.
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
