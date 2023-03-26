import 'rsuite/dist/rsuite.min.css';
import './App.css';
import Input from 'rsuite/Input';
import { useState } from 'react';
import { Message, Button } from 'rsuite';
import Card, {checkEnd} from './Card.js';

const colorDict = {};

function generateRandomColor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  // console.log(randomColor);
  return '#'+randomColor;
}

function App() {
  // let array = [];
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [characters, setCharacters] = useState();
  const [resultText, setResultText] = useState('');
  const [end, setEnd] = useState(false);
  const updateInput = (value) => {
    setUserInput(value)
  }
  const submit = () => {
    console.log(userInput);
    setCharacters(userInput.split(''));
    setSubmitted(true);
    setEnd(false)
    checkEnd(userInput.split(''), {character:{
      'endFunc':setEnd,
      'function':setCharacters,
      'resultTextFunc':setResultText
    }})
  }
  const back = () => {
    setSubmitted(false);
    setResultText('');
    setUserInput('');
  }
  const generate = () => {
    setResultText(characters.join(''))
  }
  return (
    <div className="center">

      {!submitted&&
        <div className='wrapper'>
          <Input className="input" placeholder="Input String" onChange={updateInput}/>
          <Button appearance="primary" onClick={submit}>Submit</Button>
        </div>
      }
        
      {submitted&&
        <div className='grid'>
          <Button className="back-button" appearance="ghost" onClick={back}>&#60; back</Button>
          <div className='p2-wrapper'>
            {characters.map((char, index)=>{
              // console.log(colorDict)
              var color = '#23282B';
              if(char in colorDict){
                color = colorDict[char]
                // console.log(color)
              }else{
                color = generateRandomColor()
                // console.log(color)
                colorDict[char] = color;
              }
              return(<Card key={char+index} className="card" character={
                {'characters':characters,
                  'character':char,
                  'index':index,
                  'function':setCharacters,
                  'endFunc':setEnd,
                  'resultTextFunc':setResultText,
                  'bgcolor': color}
              }/>)
              })}
          </div>
          <div className="output">
            <Button className="generate-button" appearance="primary" onClick={generate}>generate</Button>
            <Input value={resultText} />
          </div>
          {end?<Message showIcon type="success">{userInput} : {resultText}</Message>:<></>}
        </div>
      }
        
    </div>
  );
}

export default App;
