import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN


const divStyle = {
    width: '500px',
    height: "50px",
    fontSize: "30px",
};

const buttonStyle = {
    
    width: "100px",
    height: "55px",
    marginTop: "-10px",
    marginBottom: "8px"
}

    const hashtag = {
	fontSize: "40px",
	display: "inline-block",
    marginTop: "20px",
    }

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
    <center>
    <span style={hashtag}> # </span> <TextField style={divStyle}
          id="outlined-basic"
          margin="normal"
          variant="outlined"
    value={this.state.value} onChange={this.handleChange}
    /> <Button variant = "outlined" style={buttonStyle} onClick={this.handleSubmit}>Search </Button>
    </center>
    </div>
  );
  };
}

export default App;
