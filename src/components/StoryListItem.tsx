import { Link } from 'react-router-dom';
import { IStory } from '../models/story';
import ToggleButton from './ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/storiesSlice';
import { RootState } from '../store/store';
import './StoryListItem.scss';
import { useState } from 'react';
import { FaBookmark, FaEyeSlash, FaRegBookmark } from 'react-icons/fa';
import Button from './Button';

type Props = {
  story: IStory;
};

function StoryListItem({ story }: Props) {
  const favStories = useSelector(
    (state: RootState) => state.stories.nonHiddenFavStories
  );
  const [isFavStory, setIsFavStory] = useState(
    () => favStories.findIndex((favStorie) => favStorie.id === story.id) !== -1
  );
  const dispatch = useDispatch();

  function handleClick() {
    setIsFavStory((prevIsFavStory) => !prevIsFavStory);

    if (isFavStory) {
      dispatch(actions.storyUnBookmarked(story.id));
    } else {
      dispatch(actions.storyBookmarked(story));
    }
  }

  return (
    <article className='story-item'>
      <Link to={`/stories/${story.id}`} className='story-item__title'>
        {story.title.toUpperCase() || 'NO TITLE AVAILABLE'}
      </Link>
      <div className='story-item__buttons'>
        <ToggleButton
          toggleOn={isFavStory}
          onToggle={handleClick}
          showOnToggleOn={<FaBookmark />}
          showOnToggleOff={<FaRegBookmark />}
        />
        <Button
          onClick={() => {
            dispatch(actions.storyHidden(story));
          }}>
          <FaEyeSlash />
          <span>HIDE ITEM</span>
        </Button>
      </div>
    </article>
  );
}

export default StoryListItem;
