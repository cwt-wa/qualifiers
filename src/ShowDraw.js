import React from 'react';
import {connect} from "react-redux";

class ShowDraw extends React.Component {

  render() {
    return (<>
      <table>
        <tbody>
        {this.props.draw.map((g, idx) => (
            <tr key={idx}>
              <td className="text-right">
                {g.homeUser.username}
              </td>
              <td className="text-center">
                –
              </td>
              <td className="text-left">
                {g.awayUser.username}
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </>)
  }
}

export default connect(state => ({draw: Object.keys(state.draw).map(gKey => state.draw[gKey])}))(ShowDraw);

