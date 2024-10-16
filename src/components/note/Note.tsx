import CloseButton from '../close-button/CloseButton';
import './note.scss';

export default function Note({ content, onDelete }: { content: string; onDelete: () => void }) {
  return (
    <div className="note mb-2">
      <span>{content}</span>

      <CloseButton className="close-button" onClick={onDelete}></CloseButton>
    </div>
  );
}
