import React from 'react';

class CoinList extends React.Component {
  componentDidMount() {
    this.props.getCoinList();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default CoinList;