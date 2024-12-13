import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Completed, Dashboard, Important, Todo } from '../note-routes';
import './NoteDisplayer.css';

// Icons
const addIcon = <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>;

export const NoteDisplayer: React.FC = () => {
  const { notes, handleModalVisible } = useContext(AppContext);

  const [pageTitle, setPageTitle] = useState<string>('Daily Notes');

  interface TitleMapItem {
    path: string;
    title: string;
  }

  const titleMap: TitleMapItem[] = [
    { path: '/dashboard/all', title: 'All Notes' },
    // { path: '/dashboard/Notes-todo', title: 'Notes to do' },
    { path: '/dashboard/important', title: 'Important Notes' },
    { path: '/dashboard/completed', title: 'Notes completed' },
  ];

  let curLoc = useLocation();

  useEffect(() => {
    const curTitle = titleMap.find((item) => item.path === curLoc.pathname);
    if (curTitle && curTitle.title) {
      setPageTitle(curTitle.title);
      document.title = curTitle.title;
    }
  }, [curLoc]);

  return (
    <div className='Note-displayer'>
      <div className='Note-displayer-header flex'>
        <h2 className=''>{pageTitle}</h2>
        <Button
          className='add-btn'
          onClick={handleModalVisible}
          text={addIcon}
        />
      </div>
      <Routes>
        <Route
          path='all'
          element={
            <Dashboard notes={notes} handleModalVisible={handleModalVisible} />
          }
        />
        {/* <Route
          path='Notes-todo'
          element={
            <Todo Notes={Notes} handleModalVisible={handleModalVisible} />
          }
        /> */}
        <Route
          path='important'
          element={
            <Important notes={notes} handleModalVisible={handleModalVisible} />
          }
        />
        <Route path='completed' element={<Completed notes={notes} />} />
      </Routes>
    </div>
  );
};
