import { ItemWithType } from './itemWithType';

export interface Stories {
  available: number;
  collectionURI: string;
  items: ItemWithType[];
  returned: number;
}
