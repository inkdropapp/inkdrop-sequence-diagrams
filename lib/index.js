'use strict';

var _inkdrop = require('inkdrop');

var _jsSequenceDiagrams = require('js-sequence-diagrams');

var _jsSequenceDiagrams2 = _interopRequireDefault(_jsSequenceDiagrams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Diagram = class Diagram extends _inkdrop.React.Component {
  componentDidMount() {
    this.renderDiagram();
  }
  componentDidUpdate() {
    this.renderDiagram();
  }
  render() {
    return _inkdrop.React.createElement('div', { ref: 'canvas' });
  }
  renderDiagram() {
    const code = this.props.children[0];
    const diagram = _jsSequenceDiagrams2.default.parse(code);
    this.refs.canvas.innerHTML = '';
    diagram.drawSVG(this.refs.canvas, { theme: 'simple' });
  }
};


module.exports = {
  activate() {
    const { MDEPreview } = inkdrop.components.classes;
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents['sequence'] = Diagram;
    }
  },

  deactivate() {
    const { MDEPreview } = inkdrop.components.classes;
    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null;
    }
  }
};