import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { ButtonVariant } from "../types";
import type { PropsWithChildren } from "react";

const classMap: Record<ButtonVariant, string> = {
  primary_blue: "px-6 py-3 bg-primary-blue text-primary-gray rounded-md w-full max-w-xs shadow-md hover:bg-opacity-80 hover:shadow-lg ease-in-out duration-200",
  light: "px-6 py-3 bg-white border border-primary-blue text-primary-black rounded-md w-full max-w-xs shadow-md hover:shadow-lg ease-in-out duration-200",
  borderless: "",
};

type Props = {
  className?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  href?: string;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  variant = "primary_blue",
  onClick,
  href,
  ...props
}) => {
  
  const rootClassName = twMerge(classMap[variant], className ? className : "");

  if (href) {
    return (
      <Link href={href} className={rootClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={rootClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;