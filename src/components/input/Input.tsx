import './input.scss';

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`input ${className || ''}`} {...props} />;
}
