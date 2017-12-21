import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Base from '../component/base'

class Hello extends React.Component {
  render() {
    return (
    	<div>
    	<Base/> 
    	<h1>World World ~~</h1>
    	</div>
    )
  }
}

let res = ReactDOM.render(<Hello/>, document.getElementById('hello'));


// important !!!!
if (module.hot) {
	module.hot.accept()
}