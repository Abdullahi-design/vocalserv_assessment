interface VInputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const VInput: React.FC<VInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
};