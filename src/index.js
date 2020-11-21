import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Root = () => {
  return (
    <App />
  );
};

ReactDOM.render(<Root/>, document.querySelector(`.root`));
