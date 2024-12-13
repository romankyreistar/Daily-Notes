import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import { Button } from '../button/Button';

// Icons
const searchIcon = <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>;

export const SearchBar = () => {
  return (
    <form className='search-bar flex' tabIndex={1}>
      <input className='search-input' type='text' placeholder='Search Notes' />
      <Button className='search-btn' text={searchIcon} type='submit' />
    </form>
  );
};
