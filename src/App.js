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
      setCountId(countId+1)
    }
    else {
      setTodo([{name:newtodo,category:newcategory, statue:newstatue,id:countId}])
      setCountId(countId+1)
    }
    
  }
  
  const categoryControl =() => {
    const getcategory = axios.get('http://localhost:80/category')
    console.log(getcategory)
  
  }

  const handleCategoryAdd = () => {
    const getcategorytest = axios.get('http://localhost:80/category')
    console.log(getcategorytest)
    const newcategory = document.getElementById("addcategory").value
    const postcategory = 
    {
      title:newcategory
    }

    axios
    .post('http://localhost:80/category', postcategory)
    
    setCategory([...category,{category:newcategory,id:categoryCountId}])
    setCategoryCountId(categoryCountId+1)
    console.log(category)
    categoryControl();

  }

  

  const handleStatueAdd = () => {
    const newstatue = document.getElementById("addstatue").value
    setStatue([...statue,{statue:newstatue,id:statueCountId}])
    setStatueCountId(statueCountId+1)
    console.log(statue)
  }

  const handleTodoRemove = (event) => {
    let indekstarget;
    for (let i=0; i<todo.length; i++) {
      if (todo[i].id==event.target.name) {
        indekstarget = i;
        console.log("içeri girildi")
        console.log("içeri girildiğinde todo"+todo)
      }
    }
    console.log("silinen indeks"+indekstarget)
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
        categoryindekstarget= i;
      }
    }
    category.splice(categoryindekstarget,1)
    setCategory([...category])
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

                <MenuItem value={category.category}>{category.category}</MenuItem>
              
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
                <MenuItem value={statue.statue}>{statue.statue}</MenuItem>
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
                  <TableCell align="right">Categories Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                  
                    {category.map((category) => (
                      <TableRow
                        key={category.category}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {category.category}
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
        <TextField name="newstatue" id="addstatue" label="Add Statue" variant="filled" type="text" />  
        <Button onClick={handleStatueAdd} variant="contained">Ekle</Button>

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
                          {statue.statue}
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
