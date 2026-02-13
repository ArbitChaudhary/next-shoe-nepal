import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
  selectClassName?: string;
  errors?: FieldErrors<T>;
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
  required = false,
  className = "",
  selectClassName = "",
  errors,
}: ControlledSelectProps<T>) {
  return (
    <div className={`space-y-2 w-full ${className}`}>
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
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className={cn("w-full", selectClassName)} id={name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value={""}>--Select</SelectItem> */}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors && errors[name] && (
        <p className="text-[10px] md:text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
