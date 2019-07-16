import React from 'react';
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId)
  }

  onSubmit = (formValues) => {
    console.log(formValues)
  }

  render () {
    // if (!this.props.stream) {
    //   return (
    //   <div>Loading ...</div>
    //   )
    // }
    return (<>
      <h3>Edit a Stream</h3>
      <StreamForm 
        initialValues={this.props.stream} 
        onSubmit={this.onSubmit}
      />
    </>);
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
    fetchStream,
    editStream
})(StreamEdit);

