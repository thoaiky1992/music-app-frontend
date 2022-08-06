import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, FC, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";

interface FormikInputProps {
  type?: string;
}

const FormikInput: FC<
  FormikInputProps &
    InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> &
    FieldHookConfig<string>
> = ({ type = "text", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        type={type}
        {...field}
        {...props}
        className={`${props.className} ${
          meta.touched &&
          meta.error &&
          "!border-high-light ring-high-light ring-2"
        }`}
      />
      {meta.touched && meta.error && (
        <div className="text-high-light text-xs lg:text-xs mt-2">
          {meta.error}
        </div>
      )}
    </>
  );
};
export default FormikInput;
