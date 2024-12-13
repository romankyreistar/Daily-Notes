import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface NavLink {
  step: string;
}

interface UseIndicatorResult {
  sidebarRef: React.RefObject<HTMLElement>;
  navListRef: React.RefObject<HTMLUListElement>;
  navListClass: string;
  indicatorRef: React.RefObject<HTMLLIElement>;
  indicatorStyle: {
    transformY: string;
    transformX: string;
  };
  windowWidth: number;
  activeIndex: number;
}

export const useIndicator = (navLinks: NavLink[]): UseIndicatorResult => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [stepHeight, setStepHeight] = useState<number>(0);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const sidebarRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  const indicatorStyle = {
    transformY: `translateY(${activeIndex * stepHeight}px)`,
    transformX: `translateX(${activeIndex * stepWidth}px)`,
  };

  const navListClass = windowWidth <= 700 ? 'nav-list-x' : 'nav-list-y';

  const handleResizeStyle = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeStyle);
    return () => {
      window.removeEventListener('resize', handleResizeStyle);
    };
  }, []);

  useEffect(() => {
    const sidebarLink = navListRef.current?.querySelector('.nav-link');
    setStepWidth(sidebarLink?.clientWidth || 0);
    setStepHeight(sidebarLink?.clientHeight || 0);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname.split('dashboard/')[1];
    const activeLink = navLinks.findIndex((link) => link.step === currentPath);
    setActiveIndex(currentPath.length === 0 ? 0 : activeLink);
  }, [location]);

  useEffect(() => {
    const indicatorEl = indicatorRef.current;
    if (indicatorEl) {
      const sidebarLink = sidebarRef.current?.querySelector('.nav-link');
      indicatorEl.style.width = `${sidebarLink?.clientWidth}px`;
      indicatorEl.style.height = `${sidebarLink?.clientHeight}px`;
      setStepWidth(sidebarLink?.clientWidth || 0);
      setStepHeight(sidebarLink?.clientHeight || 0);
    }
  }, [windowWidth]);

  return {
    sidebarRef,
    navListRef,
    navListClass,
    indicatorRef,
    indicatorStyle,
    windowWidth,
    activeIndex,
  };
};
