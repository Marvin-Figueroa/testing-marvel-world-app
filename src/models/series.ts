import { Item } from './item';

export interface Series {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}
