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
      beansPerBoop: 1,
      // TODO: Replace boopsPerSecond with number of sprites.
      boopsPerSecond: 0,
      candidate: randomSprite(),
    };

    this.clickForBeans = this.clickForBeans.bind(this);
    this.upgradeBoops = this.upgradeBoops.bind(this);
    this.dismissCandidate = this.dismissCandidate.bind(this);
  }

  upgradeBoops() {
    const cost = this.getTreatCost();
    if (cost > this.state.beans) return;
    this.setState({
      beansPerBoop: this.state.beansPerBoop + 1,
      beans: this.state.beans - cost,
    });
  }

  clickForBeans() {
    this.setState({beans: this.state.beans + this.state.beansPerBoop});
  }

  dismissCandidate() {
    const cost = this.getDismissCandidateCost();
    if (cost > this.state.beans) return;
    this.setState({
      candidate: randomSprite(),
      beans: this.state.beans - cost,
    });
  }

  getTreatCost() {
    return 100 * this.state.beansPerBoop;
  }

  getDismissCandidateCost() {
    return 5;
  }

  getBeansPerSecond() {
    return this.state.boopsPerSecond * this.state.beansPerBoop;
  }

  render() {
    const candidate = this.state.candidate;
    return (
      <main>
        <aside>
          <h2>
            { this.state.beans } beans
          </h2>
          <h3>
            { this.getBeansPerSecond() } Beans per second
          </h3>

          <div className="item-info">
            <img src="/img/items/treat/mushroom.png" alt="Treat" title="Treat" />
            <div>
              <h4>Magic Treat</h4>
              You own: { this.state.beansPerBoop }
              <p>
                Magic treats make your sprites more efficient at collecting
                magic beans.
              </p>
            </div>
          </div>
          <button onClick={ this.upgradeBoops }>
            Buy Magic Treat for { this.getTreatCost() } beans
          </button>
        </aside>
        <section>

          <h2>
            Arky the Arko
          </h2>
          <h3>
            Arky patiently waits for you to pet him.
          </h3>
          <img
            className="click-floater"
            src="/img/items/treat/shine_pepper.png"
            alt="Magic Bean"
            title="Magic Bean"
          />
          <button
            className="active-sprite"
            onClick={this.clickForBeans}
          >
            <img
              src="/img/sprites/arko/saylian.png"
              alt="Arky the Arko"
              title="Arky the Arko"
            />
          </button>
        </section>
        <aside>
          <h2>
            Find new friends
          </h2>
          <img
            className='candidate'
            src={`/img/sprites/${candidate.species}/${candidate.variant}.png`}
            alt={`${candidate.variant} ${candidate.species}`}
          />
          <figcaption>
            {`${candidate.name} the ${candidate.variant} ${candidate.species}`}
          </figcaption>
          <button>
            {`Recruit ${candidate.name} for 100 Beans.`}
          </button>
          <button onClick={this.dismissCandidate}>
            {`Dismiss ${candidate.name} for ${this.getDismissCandidateCost()} Beans.`}
          </button>
        </aside>
      </main>
    );
  }
}

export default App;
