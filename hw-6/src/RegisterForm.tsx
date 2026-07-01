import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData } from "./registerSchema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordComfirm: "",
    },
  });

  const watched = watch();

  function controlClass(name: keyof RegisterData) {
    const hasError = !!(errors as any)[name];
    const value = (watched as any)[name];
    if (hasError) return "input-control error";
    if (value) return "input-control success";
    return "input-control";
  }

  async function onSubmit(data: RegisterData) {
    console.log("Submitted:", data);
    alert("Успіх! Перевірте консоль для даних форми.");
    reset();
  }

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration</h1>

        <div className={controlClass("username")}>
          <label htmlFor="username">Username</label>
          <input id="username" placeholder="Your username" aria-invalid={!!errors.username} {...register("username")} />
          <div className="error">{errors.username && (errors.username.message as any)}</div>
        </div>

        <div className={controlClass("email")}>
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="name@example.com" aria-invalid={!!errors.email} {...register("email")} />
          <div className="error">{errors.email && (errors.email.message as any)}</div>
        </div>

        <div className={controlClass("password")}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="At least 8 characters" aria-invalid={!!errors.password} {...register("password")} />
          <div className="error">{errors.password && (errors.password.message as any)}</div>
        </div>

        <div className={controlClass("passwordComfirm")}>
          <label htmlFor="passwordComfirm">Password again</label>
          <input id="passwordComfirm" type="password" placeholder="Repeat password" aria-invalid={!!errors.passwordComfirm} {...register("passwordComfirm")} />
          <div className="error">{errors.passwordComfirm && (errors.passwordComfirm.message as any)}</div>
        </div>

        <button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
