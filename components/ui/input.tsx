import * as React from "react";
import { cn } from "@/lib/utils";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn("flex h-11 w-full rounded-lg border border-[#F0E0E5] bg-white px-4 py-2 text-sm placeholder:text-[#777777] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] disabled:cursor-not-allowed disabled:opacity-50 transition-all", className)} ref={ref} {...props} />;
});
Input.displayName = "Input";
export { Input };
