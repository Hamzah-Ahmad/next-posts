import SigninForm from "@/app/components/forms/SigninForm";
import { Suspense } from "react";

const Register = () => {
  return (
    <Suspense>
      <div className="h-screen flex justify-center items-center">
        <SigninForm />
      </div>
    </Suspense>
  );
};

export default Register;
