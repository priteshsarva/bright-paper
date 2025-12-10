import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

type FormInputProps = InputProps | TextareaProps;

export default function FormInput({
  label,
  error,
  required = false,
  className = '',
  as = 'input',
  ...props
}: FormInputProps) {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200';
  const errorStyles = error ? 'border-red-500' : 'border-neutral-300';

  const InputComponent = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="mb-4">
      <label className="block text-neutral-700 font-medium mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <InputComponent
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...(props as any)}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
