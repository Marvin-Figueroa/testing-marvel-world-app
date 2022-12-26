import { Item } from './item';

export interface Events {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}
