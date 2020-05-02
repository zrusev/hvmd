import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import data from './data';
import { config } from 'react-spring/renderprops';
import { Slug, Fade } from './Primitives';
import { Icon } from 'antd';
import Grid from './Grid';
import NavBar from './NavBar';

class Cell extends Component {
  render() {
    const { toggle, name, description, css, cover, frame, active } = this.props
    const srcPattern = /(?<=src=").*?(?=["])/;
    const srcPlayer = srcPattern.exec(frame);

    return (
      <div
        className="cell"
        style={{  backgroundImage: !active ? `url(${process.env.PUBLIC_URL + cover})` : css, cursor: !active ? 'pointer' : 'auto' }}
        onClick={!active ? toggle : undefined}>
        <Fade show={active} delay={active ? 400 : 0}>
          <div className="details">
            <Slug delay={400}>
              <div className="player-wrapper">
                <iframe 
                  className="player"
                  src={srcPlayer}
                  title={name} 
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay" 
                >
                </iframe>
              </div>

              <div className="close">
                <Icon
                  type="close"
                  style={{ cursor: 'pointer' }}
                  onClick={toggle}
                />
              </div>
              <h1>{name}</h1>
              <p>{description}</p>
            </Slug>
          </div>
        </Fade>
        <Fade
          show={!active}
          from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
          delay={active ? 0 : 400}>
          <div className="default">
            <div style={{ zIndex: 1 }}>{name}</div>
          </div>
        </Fade>
      </div>
    )
  }
}

export default class App extends Component {
  state = { data }
  render() {
    return (
      <>
        <NavBar />
        <Grid
          className="grid"
          data={this.state.data}
          keys={d => d.name}
          heights={d => d.height}
          columns={2}
          margin={30}
          lockScroll={true}
          closeDelay={200}
          config={config.slow}>
          {(data, active, toggle) => (
            <Cell {...data} active={active} toggle={toggle} />
          )}
        </Grid>
      </>
    )
  }
}