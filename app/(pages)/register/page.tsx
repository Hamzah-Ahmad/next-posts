import React, { Suspense } from "react";

import RegisterForm from "@/app/components/forms/RegisterForm";

const Register = () => {
  return (
    <Suspense>
      <div className="h-3/4 flex justify-center items-center px-4 md:px-0">
        <RegisterForm />
      </div>
    </Suspense>
  );
};

export default Register;
