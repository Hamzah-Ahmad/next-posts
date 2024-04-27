import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";

const FormButton = ({
  children,
  type,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      {...rest}
      disabled={disabled || pending}
      className={classNames(
        "bg-neutral-950 text-white p-2 rounded-lg",
        pending && `cursor-wait  opacity-40`,
        disabled && `cursor-default`,
        rest.className
      )}
    >
      {children}
    </button>
  );
};

export default FormButton;
