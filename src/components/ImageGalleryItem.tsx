import { Thumbnail } from '../models/thumbnail';
import './ImageGalleryItem.scss';

type Props = {
  image: Thumbnail;
};

function ImageGalleryItem({ image }: Props) {
  return (
    <div className='image-gallery__item'>
      <img src={image.path + '.' + image.extension} alt='' />
    </div>
  );
}

export default ImageGalleryItem;
