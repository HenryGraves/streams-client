import React from 'react';
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import flv from 'flv.js'


//////////////////////////////////////////////
class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { streamId } = this.props.match.params;
    this.props.fetchStream(streamId)
    this.buildPlayer()
  }

  componentDidUpdate() {
    this.buildPlayer()
  }

  componentWillUnmount() {
    // this.player.destroy();
  }

  buildPlayer() {
    const { streamId } = this.props.match.params;
    if (this.player || !this.props.stream) {
      return null;
    } else {
      this.player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${streamId}.flv`
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream
    return (
      <div>
        <video 
          ref={this.videoRef} 
          style={{width: '100%'}}
          controls
        />
        <h1>{this.props.stream.title}</h1>
        
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}
///////////////////////////////////////////////



const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.streamId]}
}


export default connect(mapStateToProps, {fetchStream})(StreamShow);