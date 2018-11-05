import React from 'react';

export default function HelperPortrait(props) {
  let x = '';
  let y = '';
  if (props.sprite.position < 0.25) {
    x = `calc(0% - 350px)`;
    y = `calc(${props.sprite.position * 200}% - 350px)`;
  } else if (props.sprite.position < 0.5) {
    x = `calc((${(props.sprite.position * 400) - 100}% - 350px)`;
    y = `calc(0% - 350px)`;
  } else if (props.sprite.position <= 1){
    x = `100%`;
    y = `calc(${(props.sprite.position * 200) - 150}% - 350px)`;
  } else {
    x = `calc(50% - 350px)`;
    y = `calc(50% - 175px)`;
  }
  return (
    <img
      className='helper-portrait'
      src={`/img/sprites/${props.sprite.species}/${props.sprite.variant}.png`}
      alt={`${props.sprite.name} the ${props.sprite.variant} ${props.sprite.species}`}
      title={`${props.sprite.name} the ${props.sprite.variant} ${props.sprite.species}`}
      style={{
        left: x,
        bottom: y,
      }}
    />
  );
}
