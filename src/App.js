import React, {Component} from 'react'
import CastButton from './CastButton'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/ElephantsDream.mp4'
  }

  render(){
    return (
      <div className="App">
        <video
          id="vid"
          src={this.src}
          autoPlay
          controls={true}
        />
        <CastButton src={this.src}/>
      </div>
    );
  }
}

export default App;
