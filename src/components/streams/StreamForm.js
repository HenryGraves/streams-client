import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({error, touched}) {
    if (touched && error) {
      return (<>
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      </>);
    }
  }

  renderInput = ({ input, label, meta }) => {
    let className = ''
    if (meta.touched && meta.error) {
      className = "field error"
    } else {
      className = "field"
    }
    return ( <>
    <div className={className} >
      <label>{label}</label>
      <input {...input} />
      {this.renderError(meta)}
    </div>
    </> )
  }
  
  submit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render() {
    const { handleSubmit } = this.props;
    const { submit } = this;
    return (
      <form 
        className="ui form error" 
        onSubmit={handleSubmit(submit)} >
        <Field 
          name="title" 
          component={this.renderInput} 
          label="Enter title"
        />
        <Field
          name="description" 
          component={this.renderInput} 
          label="Enter description"
        />
        <button className="">submit</button>
      </form>
    );
  }

}

const validate = (formValues) => {
  const errors = {}
  if (!formValues.title)
    errors.title = 'You must enter a title'
  if (!formValues.description)
    errors.description = 'You must enter a description'
  return errors
}

export default reduxForm ({
  form: 'streamForm',
  validate
})(StreamForm);
