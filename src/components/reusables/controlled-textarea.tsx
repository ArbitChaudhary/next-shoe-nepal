import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ControlledTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  errors?: FieldErrors<T>;
  rows?: number;
  maxLength?: number;
}

export function ControlledTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  required = false,
  className = "",
  textareaClassName = "",
  errors,
  rows = 4,
  maxLength,
}: ControlledTextareaProps<T>) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={name} className="text-xs md:text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            className={textareaClassName}
            rows={rows}
            maxLength={maxLength}
            value={field.value ?? ""}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-[10px] md:text-sm text-red-500 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
