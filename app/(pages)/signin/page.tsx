import SigninForm from "@/app/components/forms/SigninForm";
import { Suspense } from "react";

const SignIn = () => {
  return (
    <Suspense>
      <div className="h-3/4 flex justify-center items-center px-4 md:px-0">
        <SigninForm />
      </div>
    </Suspense>
  );
};

export default SignIn;
