// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import './css/Content.css';

class Content extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="Content">
        {children}
      </div>
    );
  }
}

export default Content;
