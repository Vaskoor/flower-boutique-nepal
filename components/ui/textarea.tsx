import * as React from "react";
import { cn } from "@/lib/utils";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea className={cn("flex min-h-[100px] w-full rounded-lg border border-[#F0E0E5] bg-white px-4 py-3 text-sm placeholder:text-[#777777] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E63] disabled:cursor-not-allowed disabled:opacity-50 resize-none", className)} ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";
export { Textarea };
