// @flow
import React, { Component } from 'react';
import './App.css';
import { randomSprite } from './spriteHelper';
import { capitalizeFirst } from './utils';

class App extends Component {
  render() {
    const candidate = randomSprite();
    return (
      <main>
        <aside>
          1000 beans
        </aside>
        <section>
          Arky the Arko
        </section>
        <aside>
          Find new friends
          <img
            className='candidate'
            src={`/img/sprites/${candidate.species}/${candidate.variant}.png`}
            alt={`${candidate.variant} ${candidate.species}`}
          />
          <figcaption>
            {`${candidate.name} the ${candidate.variant} ${candidate.species}`}
          </figcaption>
          <div>{`Recruit ${candidate.name} for 500 Beans.`}</div>
          <div>{`Dismiss ${candidate.name} for 50 Beans.`}</div>
        </aside>
      </main>
    );
  }
}

export default App;
