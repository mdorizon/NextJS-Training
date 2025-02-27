"use client";

const FormErrorMessage = ({ message }: { message: string }) => {
  return <span className="text-red-400 font-semibold text-md">{message}</span>;
};

export default FormErrorMessage;
