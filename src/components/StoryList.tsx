import { IStory } from '../models/story';
import StoryListItem from './StoryListItem';
import './StoryList.scss';

type Props = {
  stories: IStory[];
};

function StoryList({ stories }: Props) {
  return stories.length > 0 ? (
    <div className='stories-container'>
      {stories?.map((story) => (
        <StoryListItem key={story.id} story={story} />
      ))}
    </div>
  ) : (
    <p className='stories-message'>No stories to show.</p>
  );
}

export default StoryList;
