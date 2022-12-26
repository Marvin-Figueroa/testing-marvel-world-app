import { Thumbnail } from '../models/thumbnail';
import './ItemDetail.scss';

type Props = {
  thumbnail?: Thumbnail | null;
  title?: string;
  description?: string;
};

function ItemDetail({ thumbnail, title, description }: Props) {
  return (
    <>
      <div className='item'>
        <img
          className='item__image'
          src={
            thumbnail
              ? thumbnail.path + '/standard_xlarge.' + thumbnail.extension
              : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          }
          alt={title}
        />
        <div className='item__text'>
          <h2 className='item__title'>{title?.toUpperCase()}</h2>
          <p className='item__description'>
            {description || 'No description available.'}
          </p>
        </div>
      </div>
    </>
  );
}

export default ItemDetail;
