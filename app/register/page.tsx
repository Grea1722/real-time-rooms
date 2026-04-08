"use client";
import { useActionState, useState, useTransition } from "react";
import { registerAction } from "./actions";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  registerSchema,
} from "@/lib/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  //state: manage loading and error states
  //formAction: handle form submission and call the server action
  //isPending: disable the submit button while the registration is in progress
  const [state, formAction, isPending] = useActionState(registerAction, {
    error: null,
  });
  const [, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    //create a FormData object to send to the server action
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);

    //call the server action
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border-slate-100 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Register
        </h2>
        <input type="text" placeholder="Full Name" {...register("fullname")} />
        {errors.fullname && (
          <p className="text-red-500 text-sm">{errors.fullname.message}</p>
        )}
        <input
          type="email"
          placeholder="user@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input type="password" placeholder="******" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg"
          disabled={isPending || isSubmitting}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
