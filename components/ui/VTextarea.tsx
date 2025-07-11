interface VTextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
}

export const VTextarea: React.FC<VTextareaProps> = ({
  placeholder,
  value,
  onChange,
  rows = 3,
  className = ''
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm resize-none ${className}`}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};