const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '강남',
    value: '',
    result: '',
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
      this.refInput.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
      this.refInput.focus();
    }
  };

  onChangeInput = e => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  refInput;
  onRefInput = c => {
    this.refInput = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

module.exports = WordRelay;