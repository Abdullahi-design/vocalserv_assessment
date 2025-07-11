import { VSelect } from "./VSelect";

interface VGradeLevelSelectProps {
  gradeLevels: Array<{ id: number; name: string; description: string }>;
  value: string;
  onChange: (value: string) => void;
  includeEmpty?: boolean;
}

export const VGradeLevelSelect: React.FC<VGradeLevelSelectProps> = ({
  gradeLevels,
  value,
  onChange,
  includeEmpty = true
}) => {
  const gradeLevelOptions = gradeLevels.map(gl => ({
    value: gl.name,
    label: `${gl.name} - ${gl.description}`
  }));

  return (
    <VSelect
      options={gradeLevelOptions}
      value={value}
      onChange={onChange}
      placeholder="Select Grade Level (Optional)"
    />
  );
};