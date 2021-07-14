import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUpload,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { VideoModel } from '../../types';
import { getVideos } from '../../common/utils';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex-none mx-4 text-lg text-gray-800">
        <FontAwesomeIcon
          className="flex-1"
          color="red"
          icon={faPlayCircle}
          size="2x"
        />
      </div>
    </Link>
  );
};

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setFilterTerm: (filterTerm: string) => void;
  setVideos: (videos: VideoModel[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setErrorMsg: (errorMsg: string) => void;
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setFilterTerm,
  setVideos,
  setIsLoading,
  setErrorMsg,
  setIsError,
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const performAction = () => {
    getVideos(searchTerm, setVideos, setIsLoading, setIsError, setErrorMsg);
    setFilterTerm(searchTerm);
    setSearchTerm('');
  };

  return (
    <div className="w-screen md:w-3/5 h-10 cursor-pointer border bg-white text-sm flex rounded-full">
      <input
        type="search"
        name="serch"
        value={searchTerm}
        placeholder="Search"
        onChange={handleChange}
        className="flex-grow px-4 text-md focus:outline-none rounded-full"
      />
      <span className="flex items-center m-3 text-lg text-gray-700 w-4 h-4 my-auto">
        <button
          className="focus:outline-none"
          type="button"
          onClick={performAction}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </span>
    </div>
  );
};

const NavLinks = () => {
  return (
    <div className="flex-none flex-initial">
      <div className="flex justify-end items-center relative">
        <div className="flex mx-4 items-center">
          <Link to="/upload">
            <span className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full cursor-pointer">
              <div className="flex items-center relative whitespace-nowrap">
                <FontAwesomeIcon icon={faUpload} />
              </div>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({
  searchTerm,
  setFilterTerm,
  setSearchTerm,
  setVideos,
  setIsLoading,
  setErrorMsg,
  setIsError,
}: SearchBarProps) => {
  return (
    <nav className="w-screen bg-gray-100 shadow-sm">
      <div className="md:w-10/12 mx-auto flex flex-row items-center p-2 justify-between">
        <Logo />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterTerm={setFilterTerm}
          setVideos={setVideos}
          setIsLoading={setIsLoading}
          setErrorMsg={setErrorMsg}
          setIsError={setIsError}
        />
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
