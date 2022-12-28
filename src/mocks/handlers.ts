import { rest } from 'msw';
import resourcesMock from '../db.json';

// Characters
// const getCharacterDetail = (id: string | readonly string[]) => {
//   let response;
//   if (typeof id === 'string') {
//     const newId = parseInt(id);
//     response = resourcesMock.characters.find(
//       (character) => character.id === newId
//     );
//   }
//   return {
//     response: response || {},
//     status: response ? 200 : 404,
//   };
// };

// // const getCharacters = () => {
// //   return {
// //     response: resourcesMock.characters || {},
// //     status: resourcesMock.characters ? 200 : 404,
// //   };
// // };

// // Comics
// const getComicDetail = (id: string | readonly string[]) => {
//   let response;
//   if (typeof id === 'string') {
//     const newId = parseInt(id);
//     response = resourcesMock.comics.find((comic) => comic.id === newId);
//   }
//   return {
//     response: response || {},
//     status: response ? 200 : 404,
//   };
// };

// // const getComics = () => {
// //   return {
// //     response: resourcesMock.comics || {},
// //     status: resourcesMock.comics ? 200 : 404,
// //   };
// // };

// // Stories
// const getStoryDetail = (id: string | readonly string[]) => {
//   let response;
//   if (typeof id === 'string') {
//     const newId = parseInt(id);
//     response = resourcesMock.stories.find((story) => story.id === newId);
//   }
//   return {
//     response: response || {},
//     status: response ? 200 : 404,
//   };
// };

// // const getStories = () => {
// //   return {
// //     response: resourcesMock.stories || {},
// //     status: resourcesMock.stories ? 200 : 404,
// //   };
// // };

// const handlers = [
//   rest.get(
//     `${process.env.REACT_APP_BASE_API_URL}/characters/:id?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//     (req, res, ctx) => {
//       const { id } = req.params;
//       const data = getCharacterDetail(id);
//       return res(ctx.status(data.status), ctx.json(data.response));
//     }
//   ),
//   // rest.get(
//   //   `${process.env.REACT_APP_BASE_API_URL}/characters?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//   //   (req, res, ctx) => {
//   //     const data = getCharacters();
//   //     return res(ctx.status(data.status), ctx.json(data.response));
//   //   }
//   // ),
//   rest.get(
//     `${process.env.REACT_APP_BASE_API_URL}/comics/:id?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//     (req, res, ctx) => {
//       const { id } = req.params;
//       const data = getComicDetail(id);
//       return res(ctx.status(data.status), ctx.json(data.response));
//     }
//   ),
//   // rest.get(
//   //   `${process.env.REACT_APP_BASE_API_URL}/comics?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//   //   (req, res, ctx) => {
//   //     const data = getComics();
//   //     return res(ctx.status(data.status), ctx.json(data.response));
//   //   }
//   // ),
//   rest.get(
//     `${process.env.REACT_APP_BASE_API_URL}/stories/:id?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//     (req, res, ctx) => {
//       const { id } = req.params;
//       const data = getStoryDetail(id);
//       return res(ctx.status(data.status), ctx.json(data.response));
//     }
//   ),
//   // rest.get(
//   //   `${process.env.REACT_APP_BASE_API_URL}/stories?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}`,
//   //   (req, res, ctx) => {
//   //     const data = getStories();
//   //     return res(ctx.status(data.status), ctx.json(data.response));
//   //   }
//   // ),
// ];

// export default handlers;
