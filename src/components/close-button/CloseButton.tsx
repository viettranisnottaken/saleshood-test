import './close-button.scss';

export default function CloseButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button className={`close-button ${className || ''}`} onClick={onClick}>
      x
    </button>
  );
}
