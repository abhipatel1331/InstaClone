import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
// import {UserContext} from '../../App'
import M from 'materialize-css'

const Reset = ()=>{
    // const {state,dispatch} = useContext(UserContext)
    const history=useHistory()
    
    // const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email!", classes:"#e53935 red darken-1"})
            return
        }
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                // password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: "#e53935 red darken-1"})
            }else{
               
                M.toast({html:data.message, classes:"#4caf50 green"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    
    return(
        // <h1>Login</h1>
        <div className="mycard">
             <div className="card auth-card input-field">
                 <h2>Instagram</h2>
                 
                 <input 
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 />
    
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    Reset Password
  
                </button>
                
                 
                 
        
        

      </div>
        </div>

    )
}

export default Reset