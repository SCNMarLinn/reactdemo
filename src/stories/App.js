import React from 'react'
import PropTypes from 'prop-types';
import Task from '../App'

export const BasicTask = ({done, ...props}) => {
  return (
    <Task done={done} {...props} />
  );
};

BasicTask.propTypes = {
  done: PropTypes.bool
}

BasicTask.defaultProps = {
  done: false,
};
