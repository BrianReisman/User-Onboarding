import "./App.css";
import Form from "./components/Form";
import Display from './components/DisplayCards/Display';
import React, {useState} from 'react';

function App() {
  const [people, setPeople] = useState([]);
  console.log(people)
  return (
    <div className="App">
      <header className="App-header">
        <Form updateList={setPeople} state={people}/>
        <Display people={people}/>
      </header>
    </div>
  );
}

export default App;
