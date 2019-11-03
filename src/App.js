import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN


    const cardStyleLeft = {
    height: "1000px",
}


  const trStyle ={


      display: "block",
      borderBottom: "1px solid lightblue",

	}

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
};

    const hashtag = {
	fontSize: "40px",
	display: "inline-block",
    marginTop: "20px",
    };

const mytable= {

    display:"block",
    overflow:"auto",
    height:"40rem",
    width:"100%",
}




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', result: '', tones: []};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    axios.post('/tweets', {
      hashTag: this.state.value
    })
    .then(res => {
	    this.setState({ 'result': res.data});
	    //console.log(res.length);
      //console.log(res);
    })
    .then(res => {
      console.log(this.state.result)
      axios.post('/new',{
        params:{
          tweets: this.state.result
        }
      })
      .then(res =>{
        this.setState({'tones': res.data})
      })
      .then(res =>{
        console.log(this.state.tones)
      })
    })
    .catch(err => console.error(err))
    event.preventDefault();
  }

  render(){
      let display;
      const showDisplay = () => {
	  if (this.state.result.length != 0){
	  return (

		  this.state.result.map((d, index) => (
						       <tr style={trStyle}> <Card> <CardContent> {d} </CardContent> </Card> </tr> ))

		  );
		
	  }
	  else {
	      return "";
	  }
      }
	   
      
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


    <Box boxShadow={3} style={{ margin:'30px', width: '50%', height: '40rem' }}>
    <table style={mytable}>
	{showDisplay()}
    </table>

    </Box>

</div>
	  );
  };
};
export default App;
