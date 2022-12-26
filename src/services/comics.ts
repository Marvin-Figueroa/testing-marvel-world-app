import { IAPIResponse } from '../models/apiResponse';
import { IComic } from '../models/comic';
import http from './http';

export async function getComicDetail(comicId: number) {
  try {
    const comicResult = await http.get<IAPIResponse<IComic>>(
      `${process.env.REACT_APP_BASE_API_URL}/comics/${comicId}?&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`
    );

    return comicResult.data.data.results[0];
  } catch (error) {
    alert('Something went wrong. ' + error);
  }
}

export async function getPaginatedComics(
  pageNumber = 1,
  pageSize = 20,
  search = '',
  format = ''
) {
  try {
    const comicsResult = await http.get<IAPIResponse<IComic>>(
      `${process.env.REACT_APP_BASE_API_URL}/comics?${
        format !== '' && format !== 'all' ? `format=${format}&` : ''
      }${
        search.trim().length > 0 ? `titleStartsWith=${search.trim()}&` : ''
      }limit=${pageSize}&offset=${(pageNumber - 1) * pageSize}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return comicsResult.data.data;
  } catch (error) {
    alert('Something went wrong. ' + error);
  }
}

export async function getComicsByCharacter(characterId: number) {
  try {
    const comicsResult = await http.get<IAPIResponse<IComic>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/characters/${characterId}/comics?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return comicsResult.data.data;
  } catch (error) {
    alert('Something went wrong.\n\n ' + error);
  }
}

export async function getComicsByStory(storyId: number) {
  try {
    const comicsResult = await http.get<IAPIResponse<IComic>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/stories/${storyId}/comics?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return comicsResult.data.data;
  } catch (error) {
    alert('Something went wrong.\n\n ' + error);
  }
}
