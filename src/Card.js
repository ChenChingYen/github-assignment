import removeIcon from './bin.svg';
import {Button } from 'rsuite';
import { useEffect } from 'react';

const checkEnd = (res, props) => {
    const charSet = new Set([]);
    var allClear = true;
    charSet.clear();
    for(let j=0; j<res.length; j++){
        if(charSet.has(res[j])){
            allClear = false;
            console.log('duplicated '+res[j]+' found');
            break;
        }else{
            charSet.add(res[j])
        }
    }
    if(allClear){
        props.character.endFunc(true);
        props.character.function(res);
        props.character.resultTextFunc(res.join(''));
        console.log('all clear')
    }else{
        console.log('not clear')
    }
    
}

function Card(props){
    // useEffect(()=>{
    //     checkEnd(props.character.userInput.join(''));
    // })
    var res = [];
    const remove = () => {
      var selectedChar = props.character.character;
      var selectedInd = props.character.index;
      var array = props.character.characters
      // console.log(props.character.characters);
      for(var i=0; i<array.length; i++){
        if(i==selectedInd){
          res.push(array[i]);
          continue;
        }
        if(array[i]!=selectedChar){
          // console.log(array[i]);
          res.push(array[i])
        }
      }
      console.log(res);
      props.character.function(res)
      checkEnd(res, props);
    }
    return(
        <Button className='card-button' style={{backgroundColor: props.character.bgcolor}} onClick={remove}>
            <img src={removeIcon} alt="removeIcon"/>
            <h3>{props.character.character}</h3>
        </Button>
    )
  }

  export default Card;
  export {checkEnd};