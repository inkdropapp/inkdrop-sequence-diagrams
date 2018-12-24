import { React } from 'inkdrop'
import PropTypes from 'prop-types'
import SequenceDiagram from 'react-sequence-diagram'

class Diagram extends React.Component {
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
  componentDidUpdate() {
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
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents['sequence'] = Diagram
    }
  },

  deactivate() {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null
    }
  }
}
