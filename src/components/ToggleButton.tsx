import { ReactElement } from 'react';
import './ToggleButton.scss';

type Props = {
  toggleOn: boolean;
  onToggle: () => void;
  showOnToggleOn: ReactElement;
  showOnToggleOff: ReactElement;
};

function ToggleButton({
  toggleOn,
  onToggle,
  showOnToggleOn,
  showOnToggleOff,
}: Props) {
  return (
    <button
      onClick={onToggle}
      className='like-button'
      title={toggleOn ? 'Remove from bookmarks' : 'Add to bookmarks'}>
      {toggleOn ? showOnToggleOn : showOnToggleOff}
      {toggleOn ? 'REMOVE BOOKMARK' : 'ADD BOOKMARK'}
    </button>
  );
}

export default ToggleButton;
