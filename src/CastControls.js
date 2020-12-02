import React, {Component} from 'react'
/* eslint-disable */

export default class CastButton extends Component {
  constructor() {
    super()

    this.state = {isConnected:false, isMediaLoaded:false, playerState:null}
    this.remotePlayer = null;
    this.remotePlayerController = null;
  }

  componentDidMount() {
    window['__onGCastApiAvailable'] = (isAvailable) => {
      if (isAvailable && cast) {
       this.initializeCastPlayer();
      }else{
        console.log("Was not able to initialize CastPlayer")
      }
    };
  }

  initializeCastPlayer = () => {
    var options = {};

    options.receiverApplicationId = 'CC1AD845';
    options.autoJoinPolicy = chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED;
    options.androidReceiverCompatible = true;
    cast.framework.CastContext.getInstance().setOptions(options);

    this.remotePlayer = new cast.framework.RemotePlayer();
    this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);

    this.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
      function (e) {
        this.setState({isConnected:e.value}, () => {
        })
      }.bind(this)
    );

    this.remotePlayerController.addEventListener(
      cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
      function (e) {
        if(e.value){
          if(e.value==="PLAYING"){
            console.log("Chromecast is " + e.value)
            this.setState({playerState:e.value})
          }else if(e.value==="BUFFERING"){
            console.log("Chromecast is " + e.value)
            this.setState({playerState:e.value})
          }else{
            console.log("Chromecast is " + e.value)
            this.setState({playerState:e.value})
          }
        }else{
          this.setState({isMediaLoaded:e.value}, () => {
          })
        }
      }.bind(this)
    );

    this.setState({playerState:this.remotePlayer.playerState})
    this.castSrc()
  }

  castSrc = () => {
    let mediaInfo = new chrome.cast.media.MediaInfo(1, 'video/mp4')
    mediaInfo.contentUrl = this.props.src

    mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
    mediaInfo.metadata = new chrome.cast.media.TvShowMediaMetadata();
    mediaInfo.metadata.title = "Sample Title";

    let request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;
    var session = cast.framework.CastContext.getInstance().getCurrentSession()
    if(session){
      session.loadMedia(request)
      .then(() => {
        console.log("Media is loaded")
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }

  stopSrc = () => {
    var session = cast.framework.CastContext.getInstance().getCurrentSession()
    if(session){
      this.remotePlayerController.stop()
    }
  }

  render() {
    return (
      <div style={{height:"40px", width:"200px", display:"flex", position:"absolute", top:"360px", margin:"15px"}}>
        <google-cast-launcher id="castbutton">Connect to cast</google-cast-launcher>
        <button onClick={this.castSrc}>Load Media</button>
        <button onClick={this.stopSrc}>Stop</button>
      </div>
    )
  }
}
