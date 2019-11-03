import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { shadows } from '@material-ui/system';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN


    const cardStyleLeft = {
    height: "1000px",
}

    const inputStyle ={

	width: "200px",
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
    
    width: "200px",
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
    this.state = {value: '', result: '', recents: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(event) {
      console.log(event.target.value);
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    axios.post('/tweets', {
      hashTag: this.state.value
    })
    .then(res => {

	    this.setState({ result: res.data});
	    console.log(res.length);
      console.log(res);
    })
    .catch(err => console.error(err))
    event.preventDefault();
  }



    handleCheck(event) {
	//alert('A name was submitted: ' + this.state.value);                                    
	axios.post('/d')
	    .then(res => {
		    this.setState({recents: res.data.result.results}); 
		    console.log("done");
		    console.log(res);
		})
	    .catch(err => console.error(err))
	    event.preventDefault();
    }

  render(){
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
      };

      const getRecents = () => {
	  if (this.state.recents.length != 0){
	  return (
	  this.state.recents.map((i, index) => (
						<MenuItem value={i.title} 						onChange = {this.handleChange}>

						    {i.title} </MenuItem>
          )));
	  }
	  else {
	  }
      }

      
  return (
    <div className="App">
<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" >
      Relief Insights 
    </Typography>
  </Toolbar>
</AppBar>
<br/>
    <center>
    <Button variant = "outlined" style={buttonStyle} onClick={this.handleCheck}>Load Recents      </Button>
<br/>
    <FormControl style={inputStyle}>
    <InputLabel style={inputStyle}>  </InputLabel>

    <Select  onChange = {this.handleChange} value="Recent Disasters">
	{getRecents()}
</Select>
</FormControl>

<br/> <br/>
    <span style={hashtag}> # </span> <TextField style={divStyle}
          id="outlined-basic"
          margin="normal"
          variant="outlined"
    value={this.state.value} onChange={this.handleChange}/> <Button variant = "outlined" style={buttonStyle} onClick={this.handleSubmit}>Search 
</Button>

<br/>    </center>
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
