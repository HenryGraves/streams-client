import React from 'react';
import { connect } from 'react-redux'
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId)
  }

  render () {
    console.log(this.props.stream)
    return (
      <div>
        {this.props.currentUserId}
        <br />
        {this.props.match.params.streamId}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  }
}

export default connect(
  mapStateToProps, {
    fetchStream
})(StreamEdit);

