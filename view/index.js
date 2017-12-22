import React, { Component } from 'react';

export default class Index extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		list: this.props.list || []
  	}
  }
  additem(e) {
  	let {list} = this.state
  	list.push(50 - Math.random() * 100)
  	this.setState({
  		list
  	})
  }
  render() {
  	let {list} = this.state
    return (
    	<div>
    		<button onClick={(e) => this.additem(e)}>click</button>
    		{list.map((item,k) => <div key={k}><p>{item}</p></div>)}
    	</div>
    )
  }
}