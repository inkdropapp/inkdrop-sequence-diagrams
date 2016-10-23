'use babel'

import { React } from 'inkdrop'
import sd from 'js-sequence-diagrams'

class Diagram extends React.Component {
  componentDidMount () {
    this.renderDiagram()
  }
  componentDidUpdate () {
    this.renderDiagram()
  }
  render () {
    return <div ref='canvas' />
  }
  renderDiagram () {
    console.log('Rendering DIAGRAM:', code)
    const code = this.props.children[0]
    const diagram = sd.parse(code)
    this.refs.canvas.innerHTML = ''
    diagram.drawSVG(this.refs.canvas, { theme: 'simple' })
  }
}

module.exports = {
  activate () {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents['sequence'] = Diagram
    }
  },

  deactivate () {
    const { MDEPreview } = inkdrop.components.classes
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null
    }
  }
}
