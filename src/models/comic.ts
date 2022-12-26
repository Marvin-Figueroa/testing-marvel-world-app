import { Characters } from './characters';
import { Creators } from './creators';
import { Events } from './events';
import { Item } from './item';
import { Stories } from './stories';
import { Thumbnail } from './thumbnail';
import { Url } from './url';

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Item;
  variants: Item[];
  collections: Item[];
  collectedIssues: Item[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

export interface Date {
  type: string;
  date: Date;
}

export interface Price {
  type: string;
  price: number;
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}
