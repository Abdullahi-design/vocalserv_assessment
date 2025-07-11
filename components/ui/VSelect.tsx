interface VSelectOption {
  value: string;
  label: string;
}

interface VSelectProps {
  options: VSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const VSelect: React.FC<VSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = ''
}) => {
  return (
    <select
      className={`w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};