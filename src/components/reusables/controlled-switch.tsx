import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ControlledSwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  errors?: FieldErrors<T>;
  description?: string;
}

export function ControlledSwitch<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  required = false,
  className = "",
  errors,
  description,
}: ControlledSwitchProps<T>) {
  return (
    <div
      className={`space-y-2 p-4 ${className} shadow-lg rounded-md bg-black/20`}
    >
      <div className="flex items-center justify-between gap-3 space-x-2">
        <div className="flex flex-col">
          {label && (
            <Label
              htmlFor={name}
              className="text-sm md:text-base font-medium cursor-pointer"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          {description && (
            <p className="text-xs md:text-sm text-gray-500">{description}</p>
          )}
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              id={name}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className=""
            />
          )}
        />
      </div>
      {errors?.[name] && (
        <p className="text-[10px] md:text-sm text-red-500 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
