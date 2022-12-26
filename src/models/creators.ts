import { ItemWithRole } from './itemWithRole';

export interface Creators {
  available: number;
  collectionURI: string;
  items: ItemWithRole[];
  returned: number;
}
