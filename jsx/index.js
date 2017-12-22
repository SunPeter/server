import React from 'react';
import ReactDOM from 'react-dom'
import Index from '../view/index'

ReactDOM.render(
  <Index {...window.__APP_INITIAL_STATE__}/>,
  document.getElementById('container')
);

// important !!!!
if (module.hot) {
	module.hot.accept()
}