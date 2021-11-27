"use strict";

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSequenceDiagram = _interopRequireDefault(require("react-sequence-diagram"));

var _inkdrop = require("inkdrop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Diagram extends React.PureComponent {
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

  componentDidUpdate(prevProps) {
    const code = this.props.children[0];
    const prevCode = prevProps.children[0];

    if (code !== prevCode) {
      this.setState({
        error: null
      });
    }

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
      return /*#__PURE__*/React.createElement("div", {
        className: "ui error message"
      }, /*#__PURE__*/React.createElement("div", {
        className: "header"
      }, "Failed to render the sequence diagram"), /*#__PURE__*/React.createElement("p", null, error.text));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "sequence-diagram",
        ref: el => this.container = el
      }, /*#__PURE__*/React.createElement(_reactSequenceDiagram.default, {
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
    if (_inkdrop.markdownRenderer) {
      _inkdrop.markdownRenderer.remarkCodeComponents['sequence'] = Diagram;
    }
  },

  deactivate() {
    if (_inkdrop.markdownRenderer) {
      delete _inkdrop.markdownRenderer.remarkCodeComponents.sequence;
    }
  }

};