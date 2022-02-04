import React, { Component } from 'react'
import UserPanel from './UserPanel'
import Groups from './Groups'

export default class Slidebar extends Component {
  render() {
    return (
      <div>
        <UserPanel name={this.props.name}></UserPanel>
        <Groups name={this.props.name}></Groups>
      </div>
    )
  }
}
