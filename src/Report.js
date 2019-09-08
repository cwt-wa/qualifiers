import React from "react";
import {connect} from "react-redux";
import toastr from 'toastr';

class Report extends React.Component {

  state = {homeScore: 0, awayScore: 0};

  onScoreChange = e => this.setState({[e.target.name]: e.target.value});

  submit = e => {
    // todo there's no game id to save to
  };

  render() {
    if (!this.props.opponent || !this.props.game) return (<p>Loading…</p>);

    return (
        <form onSubmit={this.submit} className="text-center">
          <p className="text-left">
            Report your qualifiers game against<br/>
            <strong>{this.props.opponent.username}</strong>
          </p>

          <div className="row">
            <div className="column column-offset-25 column-50">
              <label>{this.props.game.homeUser.username}</label>
              <select value={this.state.homeScore} name="homeScore" onChange={this.onScoreChange}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="column column-offset-25 column-50">
              <label>{this.props.game.awayUser.username}</label>
              <select value={this.state.awayScore} name="awayScore" onChange={this.onScoreChange}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          <p>{this.props.game.homeUser.username} {this.state.homeScore}–{this.state.awayScore} {this.props.game.awayUser.username}</p>

          <input type="submit" value="Submit"/>
        </form>
    );
  }
}

export default connect(state => {
  if (!state.auth || !state.draw) return state;

  const game = state.draw
      .find(g => g.homeUser.id === state.auth.id
          || g.awayUser.id === state.auth.id);

  let opponent;
  if (game.homeUser.id === state.auth.id) opponent = game.awayUser;
  else opponent = game.homeUser;

  return ({game, opponent, authUser: state.auth});
})(Report);

