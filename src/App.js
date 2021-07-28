/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'

import './App.css';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import { Alert, AlertTitle } from '@material-ui/lab';
import Slider from '@material-ui/core/Slider';
import moment from "moment";
import "moment/locale/ko";

import { createMystate } from './graphql/mutations'


import awsExports from "./aws-exports";
Amplify.configure(awsExports);


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://dsconsulting.tistory.com/">
        DS Consulting Co., Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  firsticon: {
    margin: theme.spacing(1),
    fontSize: theme.typography.pxToRem(50),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const timeMarks = [
  {
    value: 1,
    label: "21"
  },
  {
    value: 2,
    label: "22"
  },
  {
    value: 3,
    label: "23"
  },
  {
    value: 4,
    label: "24"
  },
  {
    value: 5,
    label: "1"
  },
  {
    value: 6,
    label: "2"
  },
  {
    value: 10,
    label: "6"
  },
  {
    value: 11,
    label: "7"
  },
  {
    value: 12,
    label: "8"
  },
  {
    value: 13,
    label: "9"
  },
  {
    value: 14,
    label: "10"
  },
  {
    value: 15,
    label: "11"
  }
];

// trainType
// trainTime
// sleepTime: '', wakeTime: ''
const initialState = {}
// const myresult = false
const App = () => {
  
  // regarding Time
  const [timeValue, setTimevalue] = React.useState([3, 12]);
  const today = moment().startOf("day");
  const yesterday = moment().startOf("day").subtract(1, "days");
  // const sleepTime = 20 + timeValue[0];
  // const wakeTime = timeValue[1] - 4;


  // 내가 aws에 보낼 값들


  const handleTimechange = (event, [value1, value2]) => {
    // 먼저 값들을 달리해줘
    setTimevalue([value1, value2]);
    // 그다음 setInput을 위한 트리거 발동
    const sleepDatetime = yesterday.add((20 + value1), "h").toISOString();
    const wakeDatetime = today.add((value2 - 4), "h").toISOString();
    setInputs(['sleepTime','wakeTime'], [sleepDatetime,wakeDatetime]);

    // setInput('wakeTime', wakeDatetime);
    // setInput('sleepTime', sleepDatetime);

    console.log(formState)

    };

  const classes = useStyles();
  const [isSuccessfullySubmitted,setIsSuccessfullySubmitted] = useState(false)
  const [formState, setFormState] = useState(initialState)
  // const [mystate, setMystate] = useState([])

  // useEffect(() => {
  //   fetchTodos()
  // }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  function setInputs(keys, values) {
    // const dummy = {[keys[0]}
    setFormState({ ...formState, [keys[0]]: values[0],[keys[1]]: values[1]  })
  }

  // async function fetchTodos() {
  //   try {
  //     const todoData = await API.graphql(graphqlOperation(listTodos))
  //     const todos = todoData.data.listTodos.items
  //     setTodos(todos)
  //   } catch (err) { console.log('error fetching todos') }
  // }

  async function addMystate() {
    try {
      // console.log('I was triggered during componentDidMount')
      // console.log(isSuccessfullySubmitted)
      if (!formState.rating) return
      // console.log(isSuccessfullySubmitted)
      const mystate = { ...formState }
      console.log(mystate)
      // setFormState(initialState)
      
      await API.graphql(graphqlOperation(createMystate, {input: mystate}))
      setIsSuccessfullySubmitted(true)
      
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
    <EmojiPeopleIcon className={classes.firsticon}>
        <LockOutlinedIcon />
      </EmojiPeopleIcon>
      <Typography component="h1" variant="h5">
        How is your day?
      </Typography>
      <form className={classes.form} noValidate >
        <Grid container spacing={2} >
          <Grid align="center" item xs={12} sm={12}>
          </Grid>
          <Grid align="center" item xs={12} sm={12} >
            <Typography component="legend"> Energy Level?</Typography>
          </Grid>
          <Grid align="center" item xs={12} sm={12}>
            <Rating 
              name="customized-10" 
              defaultValue={2} 
              max={10}
              value = {formState.rating}
              onChange={(event, newValue) => {setInput('rating', newValue)}}
            />
          </Grid>
          <Grid align="center" item xs={12} sm={12} >
            <Typography component="legend"> Any Comments?</Typography>
          </Grid>
          <Grid item xs={12}>
           <TextField
              variant="outlined" 
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              value = {formState.comment}
              onChange={event => setInput('comment', event.target.value)}
            />
          </Grid>

          <Grid align="center" item xs={12}>
            <Typography id="range-slider" gutterBottom>
              Sleep Time?
            </Typography>
            <Slider
              value={timeValue}
              step={0.5}
              marks={timeMarks}
              min={0}
              max={16}
              onChange= {handleTimechange}
              valueLabelDisplay="off"
              aria-labelledby="range-slider"
            />
          </Grid>
          <Grid item xs={12}>
          <Typography align='center' id="range-slider" gutterBottom>
              Foods Eaten?
            </Typography>
          </Grid>
          
            <Grid align="center" item xs={6} sm={6} >

            <TextField
              variant="outlined" 
              fullWidth
              id="foodType"
              label="food"
              name="foodType"
              value = {formState.foodType}
              onChange={event => setInput('foodType', event.target.value)}
            />
            </Grid>
            <Grid align="center" item xs={6} sm={6}>
            <Rating 
              name="foodRating" 
              max={5}
              value = {formState.foodRating}
              onChange={(event, newValue) => {setInput('foodRating', newValue)}}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' id="range-slider" gutterBottom>
              Exercised?
            </Typography>
          </Grid>
          <Grid align="center" item xs={7} sm={7} >
            <RadioGroup 
              aria-label="trainType" 
              name="trainType"
              value = {formState.trainType}
              onChange={event => setInput('trainType', event.target.value)}
              >
              <FormControlLabel value="yoga" control={<Radio />} label="yoga" />
              <FormControlLabel value="running" control={<Radio />} label="running" />
              <FormControlLabel value="bodyweight" control={<Radio />} label="bodyweight" />
              <FormControlLabel value="other" control={<Radio />} label="other" />
            </RadioGroup>   
          </Grid>            
          <Grid align="center" item xs={5} sm={5}>
            <RadioGroup 
              row 
              aria-label="trainTime" 
              name="trainTime"
              value = {Number(formState.trainTime)}
              onChange={event => setInput('trainTime', event.target.value)}
              >
              <FormControlLabel value={15} control={<Radio />} label="15 min" />
              <FormControlLabel value={30} control={<Radio />} label="30 min" />
              <FormControlLabel value={60} control={<Radio />} label="60 min" />
              <FormControlLabel value={90} control={<Radio />} label="90 min" />
            </RadioGroup> 
          </Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={addMystate}
        >
        Submit
        </Button>
        {isSuccessfullySubmitted && (
        <Alert severity="success">
         <AlertTitle align='center'>Submit Completed!</AlertTitle>
        </Alert>
          )} 
      </form>
    </div>
    <Box mt={5}>
      <Copyright />
    </Box>
  </Container>
  )
}


export default App