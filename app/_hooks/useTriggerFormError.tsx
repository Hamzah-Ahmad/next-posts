import React, { useEffect } from "react";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

const useTriggerFormError = (errors: FieldErrors<any> = {}) => {
  useEffect(() => {
    if (!Object.keys(errors)?.length) return;
    let errorMessages = Object.values(errors)?.map((error) => error?.message);
    if (errorMessages.length > 0) {
      toast.error(
        <ul className="list-disc pl-4">
          {errorMessages.map((msg) => (
            <li>{msg?.toString()}</li>
          ))}
        </ul>
      );
    }
  }, [errors]);
};

export default useTriggerFormError;
