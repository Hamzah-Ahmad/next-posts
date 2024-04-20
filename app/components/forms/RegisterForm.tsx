"use client";
import clsx from "clsx";
import { z } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";


const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be 3 or more characters long" })
    .max(30, { message: "Name cannot be longer than 30 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .trim()
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(12, { message: "Password cannot be longer than 12 characters" }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!res.ok) {
        const resp = await res.json();
        if (resp?.code === "P2002") {
          alert("User Email Taken");
          return;
        }

        alert("Something went wrong");
        return;
      }

      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className={clsx(
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            errors.name && "border-red-500"
          )}
          id="name"
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <small className=" text-red-400 text-xs">
            *{errors.name.message}
          </small>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={clsx(
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            errors.email && "border-red-500"
          )}
          id="email"
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <small className=" text-red-400 text-xs">
            *{errors.email.message}
          </small>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={clsx(
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            errors.password && "border-red-500"
          )}
          id="password"
          type="password"
          placeholder="******************"
          {...register("password")}
        />
        {errors.password && (
          <small className=" text-red-400 text-xs">
            *{errors.password.message}
          </small>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-neutral-950 hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
      <Link href="/signin" className="text-sm underline flex justify-end mt-2">
        Already a member? Sign In
      </Link>
      <hr className="h-0.5 border-t-0 bg-neutral-950 opacity-100 dark:opacity-50 my-6" />
      <div className="flex items-center justify-between">
        <button
          className="text-white p-2 rounded-lg bg-neutral-950 hover:bg-neutral-600 font-bold  px-4  focus:outline-none focus:shadow-outline w-full"
          type="button"
          disabled={isLoading}
          onClick={() => signIn("google", { callbackUrl })}
        >
          Sign In With Google
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
