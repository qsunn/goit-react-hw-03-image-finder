import s from './Button.module.css';

import { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Button extends Component {
  render() {
    const { loadMoreHandler } = this.props;
    return (
      <button type="button" className={s.Button} onClick={loadMoreHandler}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  loadMoreHandler: PropTypes.func.isRequired,
};
