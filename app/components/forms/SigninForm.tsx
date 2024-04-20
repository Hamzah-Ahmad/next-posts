"use client";
import clsx from "clsx";
import { z } from "zod";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";


const SigninSchema = z.object({
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

type SigninType = z.infer<typeof SigninSchema>;

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false, // Setting redirect as true was causing an issue of refreshing the browser oon incorrect credentails. Due to this, incorrect  credentials error was not being displayed
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      setIsLoading(false);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        alert("Invalid email or password");
        // setError("invalid email or password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              * {errors.email.message}
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
            className="text-white p-2 rounded-lg bg-neutral-950 hover:bg-neutral-600 font-bold py-2 px-4  focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <Link
          href={
            searchParams.get("callbackUrl")
              ? `/register?callbackUrl=${callbackUrl}`
              : "/register"
          }
          className="text-sm underline flex justify-end mt-2"
        >
          Create an account
        </Link>
      </form>
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
    </div>
  );
};

export default SigninForm;
