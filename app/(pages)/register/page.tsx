import React, { Suspense } from "react";

import RegisterForm from "@/app/components/forms/RegisterForm";

const Register = () => {
  return (
    <Suspense>
      <div className="h-screen flex justify-center items-center">
        <RegisterForm />
      </div>
    </Suspense>
  );
};

export default Register;
