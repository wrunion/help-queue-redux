import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <div><label>Names: <input
          type='text'
          name='names'
          defaultValue='Jack and Jill'
          placeholder='Pair Names' /></label></div>
          <div><label>Location: <input
          type='text'
          name='location'
          defaultValue='3a'
          placeholder='Location' /></label></div>
          <div><label>Issue: <input
          name='issue'
          defaultValue='Help us!!!'
          placeholder='Describe your issue.' /></label></div>
          <button type='submit'>
{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;