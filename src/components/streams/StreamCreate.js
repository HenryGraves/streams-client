import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  
  onSubmit = (formValues) => {
    this.props.createStream(formValues)
  }

  render() {
    const { handleSubmit } = this.props;
    const { submit } = this;
    return ( <>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit}/>
    </>);
  }

}

export default 
  connect(null, {
    createStream,
  })(StreamCreate);