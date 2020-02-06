import * as React from 'react'
import PropTypes from 'prop-types'
import SequenceDiagram from 'react-sequence-diagram'
import { markdownRenderer } from 'inkdrop'

class Diagram extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  componentDidMount() {
    this.updateSVG()
  }
  componentDidUpdate(prevProps) {
    const code = this.props.children[0]
    const prevCode = prevProps.children[0]
    if (code !== prevCode) {
      this.setState({error: null})
    }
    this.updateSVG()
  }
  render() {
    const { error } = this.state
    const code = this.props.children[0]
    const options = { theme: 'simple' }
    if (error) {
      return (
        <div className="ui error message">
          <div className="header">Failed to render the sequence diagram</div>
          <p>{error.text}</p>
        </div>
      )
    } else {
      return (
        <div className="sequence-diagram" ref={el => (this.container = el)}>
          <SequenceDiagram
            input={code}
            options={options}
            onError={this.handleError}
          />
        </div>
      )
    }
  }
  updateSVG() {
    if (this.container) {
      const svg = this.container.querySelector('svg')
      if (svg) {
        const w = svg.getAttribute('width')
        const h = svg.getAttribute('height')
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
      }
    }
  }
  handleError = e => {
    this.setState({ error: e })
  }
}

module.exports = {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents['sequence'] = Diagram
    }
  },

  deactivate() {
    if (markdownRenderer) {
      delete markdownRenderer.remarkCodeComponents.sequence
    }
  }
}
