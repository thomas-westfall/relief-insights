import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', result: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    axios.post('/', {
      hashTag: this.state.value
    })
    .then(res => { 
      console.log(res.data);
    })
    event.preventDefault();
  }

  render(){
  return (
    <div className="App">
          <label>
          Hashtag:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      <button onClick={this.handleSubmit}></button>
    </div>
  );
  };
}

export default App;
