/* eslint-disable no-unused-vars */
import './TagListItem.scss';

type Props = {
  onTagChange: (tag: string) => void;
  tag: string;
};

function TagListItem({ onTagChange, tag }: Props) {
  return (
    <div className='tag'>
      <input
        onChange={() => onTagChange(tag)}
        className='tag__input'
        type='radio'
        name='tag'
        id={tag}
      />
      <label className='tag__label' htmlFor={tag}>
        {tag}
      </label>
    </div>
  );
}

export default TagListItem;
