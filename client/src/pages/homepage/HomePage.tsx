import './HomePage.css';
import { Displayer, SideNavLeft, SideNavRight } from '@/components';

export const HomePage = () => {
  return (
    <div className='inner-container'>
      <SideNavLeft />
      <Displayer />
      <SideNavRight />
    </div>
  );
};
