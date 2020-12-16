import React, { useState, useEffect } from "react";
import Input from "./Inputs/Input";
import Checkbox from "./Inputs/Checkbox";
import * as yup from "yup";
import axios from "axios";

const data = [
  {
    type: "text",
    id: "name",
    placeholder: "test placeholder name",
  },
  {
    type: "text",
    id: "email",
    placeholder: "test placeholder email",
  },
  {
    type: "text",
    id: "password",
    placeholder: "test placeholder password",
  },
  {
    type: "checkbox",
    id: "checkbox",
    placeholder: "test placeholder email",
  },
];
const stateObj = {
  name: "",
  email: "",
  password: "",
  checkbox: false,
};

const Form = (props) => {
  const [formState, setFormState] = useState(stateObj);
  const [errors, setErrors] = useState({ ...stateObj, checkbox: "" });
  // const [btnAble, setBtnAble] = useState(true);

  //schema
  const formSchema = yup.object().shape({
    name: yup.string().required("req"),
    email: yup.string().email("That's no email!").required("req"),
    password: yup.string().required("req"),
    checkbox: yup
      .boolean()
      .oneOf([true], "must select to our demands")
      .required("req"),
  });

  formSchema.isValid(formState);

  //validate whether value meets schema
  const validateChange = (e) => {
    const type = e.target.type === "checkbox" ? "checked" : "value";
    //reach allows us to check a specific value of the schema
    yup
      .reach(formSchema, e.target.name)
      //The first thing you call when you've reached in is to validate, but... validate what? Give it something to validata
      .validate(e.target[type])
      //.then() signals that you are dealing with an asychonous function
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      //the errors that you get back is an object. to get the ERROR, you need to access the errors proprty on the returned objecr
      .catch((err) => {
        console.log(e.target.name);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const onChangeHandler = (e) => {
    if (e.target.type !== "checkbox") {
      setFormState({ ...formState, [e.target.id]: e.target.value });
    } else {
      setFormState({ ...formState, [e.target.id]: e.target.checked });
    }
    validateChange(e);
  };

  
  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        //add to state in App.js
        console.log(res);
        props.updateList([...props.state, res.data])
        //clear out state and reset input form here
      })
      .catch((err) => {
        console.log(err);
      });

      setFormState(stateObj);
  };

  return (
    //!ADD ON SUBMIT
    <form onSubmit={submitHandler}>
      {data.map((input, i) => {
        if (input.type === "text") {
          return (
            <Input
              key={i}
              type={input.type}
              id={input.id}
              name={input.id}
              placeholder={input.placeholder}
              value={formState[input.id]}
              changeHandler={onChangeHandler}
              errorMessage={errors[input.id]}
            />
          );
        } else if (input.type === "checkbox") {
          return (
            <Checkbox
              key={i}
              type={input.type}
              id={input.id}
              name={input.id}
              value={formState[input.id]}
              checked={formState[input.checkbox]}
              changeHandler={onChangeHandler}
              errorMessage={errors[input.id]}
            />
          );
        } else {
          throw new Error(
            "oopse from within Form.js. There is a piece of data that is not either 1) checkbox or 2) text"
          );
        }
      })}
      <button>Submit now</button>
      {/* <button disabled={btnAble}>Submit now</button> */}
    </form>
  );
};

export default Form;
