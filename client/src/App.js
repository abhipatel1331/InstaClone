import React,{useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screen/Home'
import Signin from './components/screen/SignIn'
import Profile from './components/screen/Profile'
import Signup from './components/screen/Signup'
import CreatePost from './components/screen/CreatePost'
import {reducer,initialState} from './reducers/userReducers'
import UserProfile from './components/screen/UserProfile'
import  SubscribedUserPosts from './components/screen/SubscribesUserPosts'
import Reset from './components/screen/Reset'
import NewPassword from './components/screen/Newpassword'
export const  UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/') no need to redirect if it has access to all
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route path="/create">
      <CreatePost />
    </Route>
    <Route path="/profile/:userid">
      <UserProfile />
    </Route>
    <Route path="/myfollowingpost">
      <SubscribedUserPosts />
    </Route>
    <Route exact path="/reset">
      <Reset />
    </Route>
    <Route path="/reset/:token ">
      <NewPassword />
    </Route>
    </Switch>
  )
}  

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    
    </UserContext.Provider>
  );
}

export default App;
