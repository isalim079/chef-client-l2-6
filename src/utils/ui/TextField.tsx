/* eslint-disable @typescript-eslint/no-explicit-any */

interface TextFieldProps {
  errors: any;
  name: string;
  register: any;
  label: string;
  classes?: string;
  placeholder?: string;
  inputType: string;
  isRequired?: boolean;
}

const TextField = ({
  errors,
  name,
  register,
  label,
  classes,
  placeholder,
  inputType,
  isRequired

}: TextFieldProps) => {
  return (
    <div className={`flex flex-col gap-3 ${classes}`}>
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
  
        name={name}
        type={`${inputType}`}
        placeholder={`${placeholder}`}
        className="p-3 rounded-md border border-black/50"
        {...register(`${name}`, { required: isRequired === false ? false : true })}
      />
      {errors[name] && (
        <p className="text-red-600 font-semibold -mt-1">
          * Required this field
        </p>
      )}
    </div>
  );
};

export default TextField;
