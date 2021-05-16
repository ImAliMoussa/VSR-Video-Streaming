import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

function Header () {

    const [inputSearch, setInputSearch] = useState('');

    return (
        <div className='header'>
          <div className="header__left">
            <Link to='/'>
              <img 
                className='header__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Vsr_logos.jpg'
                alt=''
              />
            </Link>
          </div>
          
          <div className="header__center">
            <input type='text' onChange={(e) => setInputSearch(e.target.value)} value={inputSearch}/>
            <Link to={`/search/${inputSearch}`}>
              <SearchIcon className='header__searchbutton'/>
            </Link>
            
          </div>

          <div className="header__right">
            <PublishIcon className='header__icon'/>
            <Avatar
              alt='Grad'
              stc='https://avatars1.githubusercontent.com/u/35970677?s=60&v=4'
            />
          </div>
          
        </div>
    )
}

export default Header;
