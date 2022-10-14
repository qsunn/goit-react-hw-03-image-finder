import s from './NothingFound.module.css';

import { Component } from 'react';
import { PropTypes } from 'prop-types';

export class NothingFound extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className={s.NothingFound}>
        <p>{message}</p>
      </div>
    );
  }
}

NothingFound.propTypes = { message: PropTypes.string.isRequired };
