import { IAPIResponse } from '../models/apiResponse';
import { IStory } from '../models/story';
import http from './http';

export async function getStoryDetail(storyId: number) {
  try {
    const storyResult = await http.get<IAPIResponse<IStory>>(
      `${process.env.REACT_APP_BASE_API_URL}/stories/${storyId}?&apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`
    );

    return storyResult.data.data.results[0];
  } catch (error) {
    alert(
      'Something went wrong. Could not get the details of the story.\n' + error
    );
  }
}

export async function getPaginatedStories(
  pageNumber = 1,
  pageSize = 20,
  character = ''
) {
  try {
    const storiesResult = await http.get<IAPIResponse<IStory>>(
      `${process.env.REACT_APP_BASE_API_URL}/stories?${
        character !== '' ? `characters=${character}&` : ''
      }limit=${pageSize}&offset=${(pageNumber - 1) * pageSize}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return storiesResult.data.data;
  } catch (error) {
    alert('Something went wrong. Could not get the list of stories.\n' + error);
  }
}

export async function getStoriesByCharacter(characterId: number) {
  try {
    const storiesResult = await http.get<IAPIResponse<IStory>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/characters/${characterId}/stories?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return storiesResult.data.data;
  } catch (error) {
    alert(
      'Something went wrong. Could not get the stories of the character.\n ' +
        error
    );
  }
}

export async function getStoriesByComic(comicId: number) {
  try {
    const storiesResult = await http.get<IAPIResponse<IStory>>(
      `${
        process.env.REACT_APP_BASE_API_URL
      }/comics/${comicId}/stories?limit=${100}&apikey=${
        process.env.REACT_APP_API_PUBLIC_KEY
      }`
    );

    return storiesResult.data.data;
  } catch (error) {
    alert(
      'Something went wrong. Could not get the stories of the comic.\n ' + error
    );
  }
}
