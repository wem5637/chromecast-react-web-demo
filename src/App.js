import React, {Component} from 'react'
import CastControls from './CastControls'
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
          style={{position:"absolute", left:0, height:"360px", width:"640px"}}
          id="vid"
          src={this.src}
          autoPlay
          controls={true}
        />
        <CastControls src={this.src}/>
      </div>
    );
  }
}

export default App;
