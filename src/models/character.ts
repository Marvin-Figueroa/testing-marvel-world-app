import { Url } from './url';
import { Thumbnail } from './thumbnail';
import { Events } from './events';
import { Stories } from './stories';
import { Comics } from './comics';
import { Series } from './series';

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}
