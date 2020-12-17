import React from "react";

const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>
        {" "}
        Please agree to our every demand:
        <br />{" "}
        <input
          type="checkbox"
          id={props.id}
          name={props.id}
          onChange={props.changeHandler}
          checked={props.value}
          placeholder={props.placeholder}
          className={props.className}
        />
      </label>
      {props.errorMessage ? <div>{props.errorMessage}</div> : null}
    </div>
  );
};

export default Input;
