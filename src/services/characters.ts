import { IAPIResponse } from '../models/apiResponse';
import { ICharacter } from '../models/character';
import http from './http';

export async function getCharacterDetail(characterId: number) {
  try {
    const characterResult = await http.get<IAPIResponse<ICharacter>>(
      `${process.env.REACT_APP_BASE_API_URL}/characters/${characterId}?&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`
    );

    return characterResult.data.data.results[0];
  } catch (error) {
    alert(
      'Something went wrong. Could not get the details of the Character.\n' +
        error
    );
  }
}

export async function getPaginatedCharacters(
  pageNumber = 1,
  pageSize = 20,
  search = '',
  comics = '',
  stories = ''
) {
  try {
    const charactersResult = await http.get<IAPIResponse<ICharacter>>(
      `${process.env.REACT_APP_BASE_API_URL}/characters?${
        search.trim() !== '' ? `nameStartsWith=${search.trim()}&` : ''
      }${comics !== '' ? `comics=${comics}&` : ''}${
        stories !== '' ? `stories=${stories}&` : ''
      }limit=${pageSize}&offset=${(pageNumber - 1) * pageSize}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return charactersResult.data.data;
  } catch (error) {
    alert(
      'Something went wrong. Could not get the list of Characters.\n' + error
    );
  }
}

export async function getCharactersByComic(comicId: number) {
  try {
    const charactersResult = await http.get<IAPIResponse<ICharacter>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/comics/${comicId}/characters?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return charactersResult.data.data;
  } catch (error) {
    alert(
      'Something went wrong. Could not get the Characters of the Comic.\n' +
        error
    );
  }
}

export async function getCharactersByStory(storyId: number) {
  try {
    const charactersResult = await http.get<IAPIResponse<ICharacter>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/stories/${storyId}/characters?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return charactersResult.data.data;
  } catch (error) {
    alert(
      'Something went wrong. Could not get the characters of the story.\n' +
        error
    );
  }
}
