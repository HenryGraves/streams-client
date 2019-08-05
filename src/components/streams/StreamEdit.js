import React from 'react';
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions';
import _ from 'lodash';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.streamId, formValues)
  }

  render () {
    // if (!this.props.stream) {
    //   return (
    //   <div>Loading ...</div>
    //   )
    // }
    console.log(this.props)
    return (<>
      <h3>Edit Stream {this.props.match.params.streamId}</h3>
      <StreamForm 
        initialValues={_.pick(this.props.stream, 'title', 'description')} 
        onSubmit={this.onSubmit}
      />
    </>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    stream: state.streams[ownProps.match.params.streamId],
    currentUserId: state.auth.userId,
  }
}

export default connect(
  mapStateToProps, {
    fetchStream,
    editStream
})(StreamEdit);

