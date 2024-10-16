import './select.scss';

export type TSelectOption<TValueType> = {
  label: string;
  value: TValueType;
};

export default function Select({
  value,
  options,
  className,
  onSelect,
  defaultValue,
  ...props
}: {
  value?: any;
  options: TSelectOption<any>[];
  className?: string;
  defaultValue?: any,
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      className={`select ${className || ''}`}
      defaultValue={defaultValue ?? options[0].value}
      onChange={onSelect}
      {...props}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
