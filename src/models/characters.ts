import { Item } from './item';

export interface Characters {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}
