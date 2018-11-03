// @flow
import React, { Component } from 'react';
import './App.css';
import { randomSprite } from './spriteHelper';
import { capitalizeFirst } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beans: 100,
    };

    this.clickForBeans = this.clickForBeans.bind(this);
  }

  clickForBeans() {
    this.setState({beans: this.state.beans + 1});
  }

  render() {
    const candidate = randomSprite();
    return (
      <main>
        <aside>
          <h2>
            { this.state.beans } beans
          </h2>
          <h3>
            0 Beans per second
          </h3>
        </aside>
        <section>
          <h2>
            Arky the Arko
          </h2>
          <h3>
            Arky patiently waits for you to pet him.
          </h3>
          <img
            className="active-sprite"
            onClick={this.clickForBeans}
            src="/img/sprites/arko/saylian.png"
            alt="Arky the Arko"
            title="Arky the Arko"
          />
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
