/* eslint-disable no-unused-vars */
import './TagList.scss';
import TagListItem from './TagListItem';

type Props = {
  onTagChange: (tag: string) => void;
  tags: string[];
};

function TagList({ onTagChange, tags }: Props) {
  return (
    <div className='tags-list'>
      {tags.map((tag) => (
        <TagListItem key={tag} onTagChange={onTagChange} tag={tag} />
      ))}
    </div>
  );
}

export default TagList;
