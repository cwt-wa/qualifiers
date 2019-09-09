import React from "react";
import {connect} from "react-redux";
import Fetch from './fetch';
import {reportGame} from './redux/actions'
import toastr from 'toastr';

class Report extends React.Component {

  state = {homeScore: 0, awayScore: 0};

  onScoreChange = e => this.setState({[e.target.name]: e.target.value});

  submit = e => {
    e.preventDefault();

    Fetch
        .reportGame(
            this.props.tournamentYear, this.props.gameKey,
            parseInt(this.state.homeScore), parseInt(this.state.awayScore))
        .then(res => {
          toastr.success('Game reported');
          this.props.reportGame(this.props.gameKey, res.homeScore, res.awayScore);
          window.location.href = "/#/";
        })
        .catch(Fetch.defaultErrorHandler);
  };

  render() {
    if (!this.props.opponent || !this.props.game) return (<p>Loading…</p>);

    if (this.props.game.homeScore != null || this.props.game.awayScore != null) {
      return (<p className="text-center">{this.props.game.homeUser.username} {this.props.game.homeScore}–{this.props.game.awayScore} {this.props.game.awayUser.username}</p>)
    }

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

  const gameKey = Object.keys(state.draw)
      .find(gKey => state.draw[gKey].homeUser.id === state.auth.id
          || state.draw[gKey].awayUser.id === state.auth.id);

  let opponent;
  if (state.draw[gameKey].homeUser.id === state.auth.id) opponent = state.draw[gameKey].awayUser;
  else opponent = state.draw[gameKey].homeUser;

  const tournamentYear = new Date(state.currentTournament.created).getUTCFullYear();

  return ({game: state.draw[gameKey], gameKey, opponent, tournamentYear, authUser: state.auth});
}, {reportGame})(Report);

