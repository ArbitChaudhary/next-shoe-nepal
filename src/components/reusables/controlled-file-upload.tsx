import { CloudUpload } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface ControlledFileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  accept?: "image/*" | "application/pdf" | string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  errors?: FieldErrors<T>;
}

export function ControlledFileUpload<T extends FieldValues>({
  control,
  name,
  label,
  accept = "image/*",
  disabled = false,
  multiple,
  errors,
}: ControlledFileUploadProps<T>) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest } }) => {
        const files = Array.isArray(value) ? value : value ? [value] : [];
        const handleClick = () => {
          if (fileRef.current) {
            fileRef.current.click();
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onChange(files[0]);
          }
        };
        return (
          <React.Fragment>
            <div
              className="border-2 border-dashed rounded-lg p-4 md:p-10"
              onClick={handleClick}
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <CloudUpload size={35} />
                <div className="text-sm text-muted-foreground">
                  Drag & drop images here, or click to browse
                </div>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG, WEBP up to 5MB each
                </p>
              </div>
              <input
                {...rest}
                type="file"
                ref={fileRef}
                accept={accept}
                disabled={disabled}
                hidden
                onChange={handleFileChange}
                multiple={multiple}
              />
            </div>
            {files.length > 0 && (
              <>
                {files.map((file, index) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Image"
                    className="rounded-md mt-2"
                    width={80}
                    height={80}
                  />
                ))}
              </>
            )}
          </React.Fragment>
        );
      }}
    />
  );
}
