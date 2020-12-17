import React from "react";

const Card = ({ person }) => {
  console.log(person);
  return (
    <div>
      <p>{person.name} set his/her password as '{person.password}' you can check it on his email -> {person.email}</p>
    </div>
  );
};

export default Card;
