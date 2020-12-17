import React from "react";
import Card from "./Card";
const Display = (props) => {
  console.log(props.people);
  return (
    <div className='display'>
      <h2>Meet Our Team!</h2>
      <p>This data you share is NOT secure!</p>
      <ul>
        {props.people.map((person, i) => {
          return <Card key={i} person={person} />;
        })}
      </ul>
      <p>feel free to hack them.... if you dare</p>
    </div>
  );
};

export default Display;
