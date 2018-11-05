// @flow
import React, { Component } from 'react';
import './App.css';
import { randomSprite } from './spriteHelper';
import { capitalizeFirst, randomChoice, randomInt } from './utils';

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
    this.timer = window.setInterval(this.timerLoop, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  timerLoop() {
    if (this.state.sprites.length > 1) {
      let booper = randomInt(this.state.sprites.length - 1);
      let activeSprite = this.state.activeSprite;
      while (booper === activeSprite) {
        booper = randomInt(this.state.sprites.length - 1);
      }
      const currentSprites = this.state.sprites.slice();
      currentSprites[booper].position = 2;
      this.setState({ sprites: currentSprites });
      setTimeout(() => {
        currentSprites[booper].position = Math.random();
        currentSprites[activeSprite].topOffset = 5;
        this.setState({
          sprites: currentSprites,
          beans: this.state.beans + this.getBeansPerSecond(),
        });
        setTimeout(() => {
          currentSprites[activeSprite].topOffset = 0;
          this.setState({
            sprites: currentSprites,
          });
        }, 200);
      }, 1000);
    }
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
    return 50 * this.state.beansPerBoop;
  }

  getRecruitCandidateCost() {
    return 50 * this.state.sprites.length;
  }

  getDismissCandidateCost() {
    return 3 * this.state.sprites.length;
  }

  getBeansPerSecond() {
    return (this.state.sprites.length - 1) * this.state.beansPerBoop;
  }

  render() {
    const candidate = this.state.candidate;
    const activeSprite = this.getActiveSprite();
    const helpers = this.state.sprites.map((helper) => (<HelperPortrait
      sprite={helper}
      key={helper.name}
    />));
    return (
      <main>
        <aside>
          <h2>
            { this.state.beans } beans
          </h2>
          <h3>
            { this.getBeansPerSecond() / 2 } Beans per second
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
        <section className="click-area">
          {helpers}
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
              style={{
                transform: `translateY(${activeSprite.topOffset}%)`,
              }}
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

function HelperPortrait(props) {
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

export default App;
