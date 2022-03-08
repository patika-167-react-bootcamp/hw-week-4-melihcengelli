import './App.css';
import {TextField} from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>
            <Typography>{children}</Typography>
          </span>
        </Box>
      )}
    </div>
  );
}



function Auth({setIsLogged}) {
  const [registerFormData, setRegisterFormData] = useState({})
  const [loginFormData, setLoginFormData] = useState({})
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRegisterFieldChange  = (event) => {
    
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setRegisterFormData(prev=>({...prev,[name]:value}))
  }
  const handleLoginFieldChange  = (event) => {
    
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setLoginFormData(prev=>({...prev,[name]:value}))
  }
  const handleRegister = () => {
    axios
    .post('http://localhost:80/auth/register', registerFormData)
    .then((response) => {
      document.cookie = `token=${response.data.token}`;
      setIsLogged(true)
    })
  }
  const handleLogin = () => {
    axios
    .post('http://localhost:80/auth/login', loginFormData)
    .then((response) => {
      document.cookie = `token=${response.data.token}`;
      setIsLogged(true)
      

    })
  }
  

  return (
    <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="basic tabs example"
            >

            <Tab label="Login" />
            <Tab label="Register"  />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField
            onChange={handleLoginFieldChange}
            name="username"
            id="outlined-basic1" 
            label="Username" 
            variant="outlined"
             /><br/><br/>
          <TextField 
            onChange={handleLoginFieldChange}
            name="password"
            id="outlined-basic2" 
            label="Password" 
            variant="outlined" 
            type="password"
             /><br/><br/>
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            name="username" 
            onChange={handleRegisterFieldChange} 
            id="outlined-basic3" 
            label="Username" 
            variant="outlined" 
            />
            <br/><br/>
          <TextField
            name="password" 
            onChange={handleRegisterFieldChange} 
            id="outlined-basic4" 
            label="Password" 
            variant="outlined" 
            type="password" 
            /><br/><br/>
          <TextField
            name="passwordConfirm" 
            onChange={handleRegisterFieldChange} 
            id="outlined-basic5" 
            label="ConfirmPassword" 
            variant="outlined" 
            type="password" 
            /><br/><br/>
          <Button onClick={handleRegister} variant="contained">Register</Button>
        </TabPanel>
    </div>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}



function Content() {
  const url = "http://localhost:80"
  const ntoken = (document.cookie).split("").splice(6);
  let nst="";
  ntoken.map(
    (response) => nst=nst+response
  )
  const config = {
    headers: { Authorization: `Bearer ${nst}` },
  };

  const [value, setValue] = React.useState(0);
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  }

  
  

  const [todo, setTodo] = useState([
  ])
  const [category, setCategory] = useState([
  ])
  const [statue, setStatue] = useState([
  ])
  const [countId, setCountId] = useState(0);
  const [categoryCountId, setCategoryCountId] = useState(0);
  const [statueCountId, setStatueCountId] = useState(0);

  const handleTodoAdd  = () => {
    const newtodo = document.getElementById("newtodo").value
    const newcategory = document.getElementById("categoryselect").innerText
    const newstatue = document.getElementById("statueselect").innerText
    if (todo.length>0) {
      setTodo([...todo,{name:newtodo,category:newcategory, statue:newstatue,id:countId}])
      const tododata = {
        "title":newtodo,
        "categoryId":countId,
        "statusId":countId,
      }
      axios
      .post(url+"/todo",tododata,config)
      .then(refreshtodo,setCountId(countId+1)
      )
    }
    else {
      setTodo([{name:newtodo,category:newcategory, statue:newstatue,id:countId}])
      const tododata = {
        "title":newtodo,
        "categoryId":newcategory,
        "statusId":newstatue,
      }
      axios
      .post(url+"/todo",tododata,config)
      .then(refreshtodo,setCountId(countId+1))

    }
    
  }
  
  const categoryControl =() => {
    const getcategory = axios.get('http://localhost:80/category')
    console.log(getcategory)
  
  }


  

  
  
  const handleCategoryAdd = () => {
  
    const newcategory = document.getElementById("addcategory").value
    console.log("newcategory="+newcategory)
    console.log(config)
    axios
    .post(url+"/category", {"title":`${newcategory}`}, {
      headers: {
        Authorization: `Bearer ${nst}`,

      },
    })
    .then(refreshcate)
    
    
    

  }
  useEffect(() => {
    axios
    .get(url+"/category", {headers: {Authorization: `Bearer ${nst}`,},})
    .then((response) => (setCategory((response.data))))
  },[]);

  useEffect(() => {
    axios
    .get(url+"/todo", {headers: {Authorization: `Bearer ${nst}`,},})
    .then((response) => (setTodo((response.data))))
  },[]);
  useEffect(() => {
    category.map((response1)=> (
      axios
      .get(url+"/status?categoryId="+response1.id, {headers: {Authorization: `Bearer ${nst}`,},})
      .then((response) => (setStatue(([...statue,response.data]))))
      ))
  },[]);




  function refreshcate () {
    axios
    .get(url+"/category", {headers: {Authorization: `Bearer ${nst}`,},})
    .then((response) => (setCategory((response.data))))
  }
  function refreshtodo () {
    axios
    .get(url+"/todo", {headers: {Authorization: `Bearer ${nst}`,},})
    .then((response) => (setTodo((response.data))))
  }
  function refreshstatus () {
    axios
    .get(url+"/status?", {headers: {Authorization: `Bearer ${nst}`,},})
    .then((response) => (setStatue((response.data))))
  }



  const handleStatueAdd = () => {
    const newstatue = document.getElementById("addstatue").value
    console.log(statue)

    axios
    .post(url+"/status", {"title":`${newstatue}`,"categoryId":`${2}`,"color":`${"white"}`}, {
      headers: {
        Authorization: `Bearer ${nst}`,

      },
    })
    .then(
      (response) => {console.log(response)},
      axios
      .get(url+"/status", {headers: {Authorization: `Bearer ${nst}`,},})
      .then((response) => setStatue((response.data)),
      )
    
      )

  }

  const handleTodoRemove = (event) => {
    let indekstarget;
    for (let i=0; i<todo.length; i++) {
      if (todo[i].id==event.target.name) {
        indekstarget = i;
      }
    }
    const indekstodo = event.target.name
    todo.splice(indekstarget,1)
    setTodo([...todo])
    console.log(todo)
    
    console.log(event.target.name)
  }
  const handleCategoryRemove = (event) => {
    let categoryindekstarget;
    for (let i=0; i<category.length; i++) {
      if (category[i].id == event.target.name) {
        categoryindekstarget= category[i].id;
      }
    }
    axios
    .delete(url+"/category/"+categoryindekstarget , {headers: {Authorization: `Bearer ${nst}`,},})
    .then(refreshcate)
    
  }

  const handleStatueRemove = (event) => {
    let statueindekstarget;
    for (let i=0; i<statue.length; i++) {
      if (statue[i].id == event.target.name) {
        statueindekstarget=i;
      }
    }
    statue.splice(statueindekstarget,1)
    setStatue([...statue])
  }

  const [categorysection, setCategorySection] = React.useState('');

  const handleChange = (event) => {
    setCategorySection(event.target.value);
  };

  const [statuesection, setStatueSection] = React.useState('');

  const handleStatueChange = (event) => {
    setStatueSection(event.target.value);
  };

  const addstatuenew = (event) => {
    const addtext = document.getElementById("addnewstatue"+event.currentTarget.id).value
    setStatue([...statue,{
      "title":addtext,
      "categoryId":event.currentTarget.id,
      "color":"purple"
    }])
    const statusdata= {
      "title":addtext,
      "categoryId":event.currentTarget.id,
      "color":"purple"
    };
    axios
    .post(url+"/status?categoryId="+event.currentTarget.id,statusdata,config)
    .then(refreshstatus)
  }
  
  const [age, setAge] = React.useState('');
 return (
  <div className="Content">
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange2}
        aria-label="basic tabs example"
        >

        <Tab label="ToDo" />
        <Tab label="Kategori"  />
        <Tab label="Statü"  />

      </Tabs>
    </Box>

    <TabPanel value={value} index={0} >

      <form>
        <TextField name="todo" id="newtodo" label="Filled" variant="filled" type="text" />
        <Box sx={{ minWidth: 120 }} id="firstbox">
          <FormControl fullWidth>
            <InputLabel id="categoryselectid">Kategoriler</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="categoryselect"
              value={categorysection}
              label="Age"
              onChange={handleChange}
            > {category.map((category) => (

                <MenuItem id={category.id} value={category.title}>{category.title}</MenuItem>
              
              ))}

            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} id="firstbox">
          <FormControl fullWidth>
            <InputLabel id="statueselectid">Statüler</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="statueselect"
              value={statuesection}
              label="Age"
              onChange={handleStatueChange}
            >
              {statue.map((statue) => (
                <MenuItem value={statue.title}>{statue.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button onClick={handleTodoAdd} variant="contained" id="firstbox">Add To Do</Button>
      </form>
      
        <TableContainer component={Paper} id="firstbox">
          <span>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>To Do List</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Statue</TableCell>
                  <TableCell align="right">Todo Kaldır</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                  
                    {todo.map((todo) => (
                      <TableRow
                        key={todo.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {todo.name}
                        </TableCell>
                        <TableCell align="right" component="th" scope="row">
                          {todo.category}
                        </TableCell>
                        <TableCell  align="right" component="th" scope="row">
                          {todo.statue}
                          {console.log(todo)}
                        </TableCell>

                        <TableCell align="right"><Button onClick={handleTodoRemove} variant="contained" name={todo.id}>To Do Kaldır</Button></TableCell>
                      </TableRow>
                    ))
                    }
              </TableBody>
            </Table>
          </span>
        </TableContainer>    
      
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <TextField name="newcategory" id="addcategory" label="Kategori Ekle" variant="filled" type="text" />  
        <Button onClick={handleCategoryAdd} variant="contained">Ekle</Button>
        
        <TableContainer component={Paper}>
          <span>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Add Statue</TableCell>
                  <TableCell align="right">Categories Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                  
                    {category.map((category) => (
                      <TableRow
                        key={category.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {category.title}
                        </TableCell>


                        <TableCell align="right" component="th" scope="row">
                          <TextField  id={"addnewstatue"+category.id} label="Add Statue" variant="standard" />
                          <Button  onClick={addstatuenew} variant="contained" id={category.id}>Add </Button>
                        </TableCell>



                        <TableCell align="right"><Button onClick={handleCategoryRemove} variant="contained" name={category.id}>Category Remove</Button></TableCell>
                      </TableRow>
                    ))
                    }
              </TableBody>
            </Table>
          </span>
        </TableContainer>    


      </TabPanel>

      <TabPanel value={value} index={2}>

        <TableContainer component={Paper}>
          <span>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Statues</TableCell>
                  <TableCell align="right">Statue Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                  
                    {statue.map((statue) => (
                      <TableRow
                        key={statue.statue}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {statue.title}
                        </TableCell>
                        <TableCell align="right"><Button onClick={handleStatueRemove} variant="contained"  name={statue.id}>Statue Remove</Button></TableCell>
                      </TableRow>
                    ))
                    }
              </TableBody>
            </Table>
          </span>
        </TableContainer>    
      </TabPanel>
    
  </div>
 )

};

function App() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = getCookie("token")
    if (token) {
      setIsLogged(true)
    }
  },[])
  return (
  <div>
    {isLogged ? <Content/> : <Auth setIsLogged={setIsLogged}/>}
  </div>)
}

export default App;
