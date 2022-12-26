import { Item } from './item';

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}
