import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { getVideos } from './common/utils';
import Navbar from './components/navbar/navbar.component';
import HomePage from './pages/home/home.page';
import UploadPage from './pages/upload/upload.page';
import WatchPage from './pages/watch-video/watch-video.page';
import { VideoModel } from './types';

export default function App() {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    getVideos(searchTerm, setVideos, setIsLoading, setIsError, setErrorMsg);
  }, []);

  return (
    <Router>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setVideos={setVideos}
        setIsLoading={setIsLoading}
        setErrorMsg={setErrorMsg}
        setIsError={setIsError}
      />
      {/* a div that takes up the entire screen */}
      <div className="h-screen">
        <Switch>
          <Route path="/upload" component={UploadPage} />
          <Route path="/watch/:key" component={WatchPage} />
          <Route
            path="/"
            render={() => (
              <HomePage
                videos={videos}
                searchTerm={searchTerm}
                isLoading={isLoading}
                isError={isError}
                errorMsg={errorMsg}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
