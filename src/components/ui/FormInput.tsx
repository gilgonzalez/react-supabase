import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  kind?: "text" | "textarea";
  disabled?: boolean;
  loading?: boolean;
  type?: HTMLInputTypeAttribute;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  kind = "text",
  loading = false,
  disabled,
  type,
}: FormInputProps<T>) {

  const [visible, toggle] = useState(false)
  return (
    loading ?
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className={`${kind === "textarea" ? "h-14" : "h-10"} w-full rounded`} />
      </div>
      :
      <FormField
        disabled={disabled}
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel className="font-semibold">{label}</FormLabel>}
            {kind === "text" && type !== "password" && (
              <FormControl>
                <Input
                  className="h-10"
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
            )}
            {kind === "textarea" && (
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
            )}
            {type === "password" && (
              <FormControl>
                <div className="relative ">
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="*******"
                    className="h-10"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {visible ? (
                      <Eye className="h-6 w-6 text-slate-800" onClick={() => toggle(false)} />
                    ) : (
                      <EyeOff className="h-6 w-6" onClick={() => toggle(true)} />
                    )}
                  </div>
                </div>
              </FormControl>
            )}
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />
  );
}