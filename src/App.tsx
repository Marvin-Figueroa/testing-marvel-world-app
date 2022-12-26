import CharacterPage from './components/CharacterPage';
import ComicPage from './components/ComicPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StoryPage from './components/StoryPage';
import NotFound from './components/NotFound';
import './App.scss';
import CharacterDetail from './components/CharacterDetail';
import ComicDetail from './components/ComicDetail';
import StoryDetail from './components/StoryDetail';
import Bookmarks from './components/Bookmarks';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<CharacterPage />} />
          <Route path='/characters' element={<CharacterPage />} />
          <Route path='/characters/:id' element={<CharacterDetail />} />
          <Route path='/comics' element={<ComicPage />} />
          <Route path='/comics/:id' element={<ComicDetail />} />
          <Route path='/stories' element={<StoryPage />} />
          <Route path='/stories/:id' element={<StoryDetail />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
