import React, {Component} from 'react'

const STATUS = {HOVERED: 'hovered', NORMAL: 'normal'}

export default class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: STATUS.NORMAL
    }
  }
  _onMouseEnter = () => {
    this.setState({class: STATUS.HOVERED})
  }
  _onMouseLeave = () => {
    this.setState({class: STATUS.NORMAL})
  }
  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    )
  }
}
