import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

function Loader({ loading }) {
  return (
    <div className="sweet-loading">
      <PropagateLoader
        color="white"
        loading={loading}
        cssOverride={override}
        size={5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
