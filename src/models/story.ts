import { Characters } from './characters';
import { Comics } from './comics';
import { Creators } from './creators';
import { Events } from './events';
import { Item } from './item';
import { Series } from './series';
import { Thumbnail } from './thumbnail';

export interface IStory {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Thumbnail | null;
  creators: Creators;
  characters: Characters;
  series: Series;
  comics: Comics;
  events: Events;
  originalIssue: Item;
}
