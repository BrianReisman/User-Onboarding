import React from "react";

const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>
        {" "}
        Please enter your {props.id}:
        <input
          className={props.className}
          type={props.type}
          onChange={props.changeHandler}
          id={props.id}
          name={props.id}
          value={props.value}
          placeholder={props.placeholder}
        />
      </label>
      {props.errorMessage ? <div>{props.errorMessage}</div> : null}
      <br />
    </div>
  );
};

export default Input;
