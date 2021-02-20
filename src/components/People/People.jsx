import React from 'react';
import { PropTypes } from 'prop-types';

export default function People({ data }) {
  return <div>{console.log(data)}</div>;
}

People.propTypes = {
  data: PropTypes.array,
};
