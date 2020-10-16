import React from "react";
import PropTypes from "prop-types";
import "./Selector.css";

class Selector extends React.Component {
  state = {
    selected: this.props.defaultValue,
  };

  mapsApiLoaded = null;
  mapInstance = null;

  handlerOnChange = (e) => {
    this.setState({ selected: e.target.value });
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className="container-selector">
        {this.props.label}
        <form>
          {this.props.options.map((option) => (
            <span id={"container-" + option.value} key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="foodOption"
                value={option.value}
                checked={this.state.selected === option.value}
                onChange={this.handlerOnChange}
              />
              <label htmlFor={option.value}>{option.name}</label>
            </span>
          ))}
        </form>
      </div>
    );
  }
}

Selector.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Selector;
