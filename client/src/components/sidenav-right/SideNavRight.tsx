import { useEffect, useState } from 'react';
import { UserPanel, NotesStats, UserMenu } from '@/components';
import LogoRegular from '@/assets/Notemanager-logo-original.png';
import './SideNavRight.css';

export const SideNavRight = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [menuVisible, setmenuVisible] = useState(false);

  const openMenu = () => {
    if (window.innerWidth <= 775) {
      !menuVisible ? setmenuVisible(true) : setmenuVisible(false);
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  useEffect(() => {
    const nav = document.querySelector('.sidenav-right') as HTMLElement;
    if (scrollPosition > 1 && window.innerWidth <= 700) {
      nav.style.borderWidth = '1px';
    } else {
      nav.style.borderWidth = '0';
    }
  }, [scrollPosition]);

  return (
    <div className='sidenav-right flex'>
      <div className='nav-top'>
        <UserPanel openMenu={openMenu} menuVisible={menuVisible} />
        <NotesStats />
      </div>
      <div className='nav-bottom'>
        <div className='brand flex'>
          <img
            src={LogoRegular}
            className='brand-logo'
            alt='NoteManager Logo'
          />
          <h3 className='brand-name'>NoteManager</h3>
        </div>
      </div>
      <UserMenu menuVisible={menuVisible} />
    </div>
  );
};
