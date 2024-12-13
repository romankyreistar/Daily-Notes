import { Header } from '../header/Header';
import { NoteDisplayer } from '../notes/note-displayer/NoteDisplayer';
import './Displayer.css';

export const Displayer = () => {
  return (
    <div className='main-displayer'>
      <Header />
      <NoteDisplayer />
    </div>
  );
};
