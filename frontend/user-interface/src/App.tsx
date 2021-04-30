import * as React from 'react';
import VideoPlayer from './VideoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4',
  }],
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <VideoPlayer {...videoJsOptions} />
      </div>
    );
  }
}

export default App;
