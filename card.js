class Card extends React.Component {
  render() {
    return React.createElement('div',{ className: 'inner'},
            React.createElement('h2', null, this.props.data.title),
            React.createElement('p', null, this.props.data.body)
      
    );
  }
}
