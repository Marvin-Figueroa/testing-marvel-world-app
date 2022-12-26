import { IComic } from '../models/comic';
import ComicListItem from './ComicListItem';
import './ComicList.scss';

type Props = {
  comics: IComic[];
};

function ComicList({ comics }: Props) {
  return comics?.length > 0 ? (
    <div className='comics-container'>
      {comics?.map((comic) => (
        <ComicListItem key={comic.id} comic={comic} />
      ))}
    </div>
  ) : (
    <p className='comics-message'>No comics to show.</p>
  );
}

export default ComicList;
