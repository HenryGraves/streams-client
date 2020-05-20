import React from 'react'
import { connect } from 'react-redux'
import { fetchStreams, deleteStream } from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams()
  }

  delete = () => {
    this.props.deleteStream()
  }

  renderAdminControls = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      )
    }
  }

  renderList() {
    // console.log('from render list')
    // console.log(this.props.streams.title)
    // if (this.props.streams.title === undefined) {
    //   return (
    //     <div className="ui header">
    //       No current streams, <br />
    //       create one below!
    //     </div>
    //   )
    // } 
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id} className="item">
          {this.renderAdminControls(stream)}
          
          <i className="big middle aligned icon"> 
          <FontAwesomeIcon style={{fontSize: 30}} icon={faHeadset}/>
          </i>
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              <h3>{stream.title}</h3>
              <div className="description">{stream.description}</div>
            </Link>
          </div>
        </div>
      )
    })
  }

  renderCreateButton() {
    // only shows a button if signed in
    if (this.props.isSignedIn) {
      return (
        <div className="middle aligned" style={{textAlign: 'left'}}>
          <Link to="/streams/new" className="ui button primary">
            Create New Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    const {  } = this.props.streams
    return ( <>
      <h2>Live Streams</h2>
      {this.renderCreateButton()}
      <div className="ui celled list">{this.renderList()}</div>
      
    </>)
  }
} // end component


// this function sends state upstairs ^
const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps, 
  { fetchStreams }
)(StreamList);