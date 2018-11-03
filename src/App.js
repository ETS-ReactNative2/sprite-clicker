// @flow
import React, { Component } from 'react';
import './App.css';
import { randomSprite } from './spriteHelper';
import { capitalizeFirst } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSprite: 0,
      sprites: [
        randomSprite(),
      ],
      beans: 100,
      beansPerBoop: 1,
      candidate: randomSprite(),
    };

    this.clickForBeans = this.clickForBeans.bind(this);
    this.upgradeBoops = this.upgradeBoops.bind(this);
    this.dismissCandidate = this.dismissCandidate.bind(this);
    this.recruitCandidate = this.recruitCandidate.bind(this);
    this.timerLoop = this.timerLoop.bind(this);
  }

  componentDidMount() {
    this.timer = window.setInterval(this.timerLoop, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  timerLoop() {
    this.setState({
      beans: this.state.beans + this.getBeansPerSecond(),
    });
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

  recruitCandidate() {
    const cost = this.getRecruitCandidateCost();
    if (cost > this.state.beans) return;
    this.setState({
      sprites: this.state.sprites.concat([this.state.candidate]),
      candidate: randomSprite(),
      beans: this.state.beans - cost,
    });
  }

  getActiveSprite() {
    if (this.state.activeSprite in this.state.sprites) {
      return this.state.sprites[this.state.activeSprite];
    }
    return {};
  }

  getTreatCost() {
    return 100 * this.state.beansPerBoop;
  }

  getRecruitCandidateCost() {
    return 100 * this.state.sprites.length;
  }

  getDismissCandidateCost() {
    return 5 * this.state.sprites.length;
  }

  getBeansPerSecond() {
    return (this.state.sprites.length - 1) * this.state.beansPerBoop;
  }

  render() {
    const candidate = this.state.candidate;
    const activeSprite = this.getActiveSprite();
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
            {`${activeSprite.name} the ${activeSprite.variant} ${activeSprite.species}`}
          </h2>
          <h3>
            {activeSprite.name} patiently waits for you to pet him.
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
              src={`/img/sprites/${activeSprite.species}/${activeSprite.variant}.png`}
              alt={`${activeSprite.name} the ${activeSprite.variant} ${activeSprite.species}`}
              title={`${activeSprite.name} the ${activeSprite.variant} ${activeSprite.species}`}
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
            alt={`${candidate.name} the ${candidate.variant} ${candidate.species}`}
            title={`${candidate.name} the ${candidate.variant} ${candidate.species}`}
          />
          <figcaption>
            {`${candidate.name} the ${candidate.variant} ${candidate.species}`}
          </figcaption>
          <button onClick={this.recruitCandidate}>
            {`Recruit ${candidate.name} for ${this.getRecruitCandidateCost()} Beans.`}
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
