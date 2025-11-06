import type { ReactNode } from "react";

interface ErrorMenssageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMenssageProps) => {
  return (
    <p className="bg-red-50 text-red-600 uppercase text-sm font-bold text-center">
      {children}
    </p>
  );
};
