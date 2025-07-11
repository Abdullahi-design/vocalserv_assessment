import { VSelect } from "./VSelect";

interface VCountrySelectProps {
  countries: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const VCountrySelect: React.FC<VCountrySelectProps> = ({
  countries,
  value,
  onChange,
  required = false
}) => {
  const countryOptions = countries.map(country => ({
    value: country,
    label: country
  }));

  return (
    <VSelect
      options={countryOptions}
      value={value}
      onChange={onChange}
      placeholder={`Select Country ${required ? '*' : ''}`}
    />
  );
};