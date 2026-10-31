import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldClasses } from "@/components/ui/input";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(fieldClasses, "min-h-24 resize-y py-2.5 leading-normal", className)}
      {...props}
    />
  );
}
