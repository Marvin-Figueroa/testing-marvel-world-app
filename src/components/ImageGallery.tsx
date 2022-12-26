import { Thumbnail } from '../models/thumbnail';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.scss';

type Props = {
  images: Thumbnail[];
};

function ImageGallery({ images }: Props) {
  return (
    <div className='images-gallery'>
      {images.map((image) => (
        <ImageGalleryItem key={image.path} image={image} />
      ))}
    </div>
  );
}

export default ImageGallery;
