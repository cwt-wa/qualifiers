import React from 'react';

export default class CheckboxList extends React.Component {

  state = {selected: []};

  toggle = elem => {
    this.setState(state => {
      if (state.selected.indexOf(elem) !== -1) state.selected.splice(state.selected.indexOf(elem), 1);
      else state.selected.push(elem);
      return {selected: state.selected};
    }, () => this.props.onSelection(this.state.selected));
  };

  isSelected = (elem) => {
    return this.state.selected.indexOf(elem) !== -1;
  };

  render() {
    return (<>
      {this.props.elems.map((elem, idx) =>
          <div key={idx}>
            <input name="applicant" id={'elem' + idx} type="checkbox"
                   checked={this.isSelected(elem)} onChange={() => this.toggle(elem)}/>
            <label className="label-inline" htmlFor={'elem' + idx}>{elem[this.props.displayKey]}</label>
          </div>)
      }
    </>)
  }

  componentDidMount() {
    this.props.onSelection(this.state.selected)
  }
}
