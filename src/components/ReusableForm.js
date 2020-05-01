import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <div><label>Names: <input
          type='text'
          name='names'
          placeholder='Pair Names' /></label></div>
          <div><label>Location: <input
          type='text'
          name='location'
          placeholder='Location' /></label></div>
          <div><lable>Issue: <input
          name='issue'
          placeholder='Describe your issue.' /></lable></div>
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