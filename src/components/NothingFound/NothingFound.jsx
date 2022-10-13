import s from './NothingFound.module.css';

import { Component } from 'react';

export class NothingFound extends Component {
  render() {
    return (
      <div className={s.NothingFound}>
        <p>Nothing found</p>
      </div>
    );
  }
}
