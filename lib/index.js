"use strict";

var _inkdrop = require("inkdrop");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSequenceDiagram = _interopRequireDefault(require("react-sequence-diagram"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Diagram extends _inkdrop.React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleError", e => {
      this.setState({
        error: e
      });
    });

    this.state = {
      error: null
    };
  }

  componentDidMount() {
    this.updateSVG();
  }

  componentDidUpdate() {
    this.updateSVG();
  }

  render() {
    const {
      error
    } = this.state;
    const code = this.props.children[0];
    const options = {
      theme: 'simple'
    };

    if (error) {
      return _inkdrop.React.createElement("div", {
        className: "ui error message"
      }, _inkdrop.React.createElement("div", {
        className: "header"
      }, "Failed to render the sequence diagram"), _inkdrop.React.createElement("p", null, error.text));
    } else {
      return _inkdrop.React.createElement("div", {
        className: "sequence-diagram",
        ref: el => this.container = el
      }, _inkdrop.React.createElement(_reactSequenceDiagram.default, {
        input: code,
        options: options,
        onError: this.handleError
      }));
    }
  }

  updateSVG() {
    if (this.container) {
      const svg = this.container.querySelector('svg');

      if (svg) {
        const w = svg.getAttribute('width');
        const h = svg.getAttribute('height');
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }
    }
  }

}

_defineProperty(Diagram, "propTypes", {
  children: _propTypes.default.node
});

module.exports = {
  activate() {
    const {
      MDEPreview
    } = inkdrop.components.classes;

    if (MDEPreview) {
      MDEPreview.remarkCodeComponents['sequence'] = Diagram;
    }
  },

  deactivate() {
    const {
      MDEPreview
    } = inkdrop.components.classes;

    if (MDEPreview) {
      MDEPreview.remarkCodeComponents.flowchart = null;
    }
  }

};