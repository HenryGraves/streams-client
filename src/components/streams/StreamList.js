import React from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams()
  }

  renderAdminControls = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <button className="ui button negative">
            Delete
          </button>
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
          <i className="massive middle aligned icon camera" />
          <div className="content">
            <h3>{stream.title}</h3>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  renderCreateButton() {
    // only shows a button if signed in
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
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
      <h2>Streams</h2>
      <div className="ui celled list">{this.renderList()}</div>
      {this.renderCreateButton()}
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