import React,{useState} from 'react'
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';
import {useNavigate} from 'react-router'
const Login = () => {


    const {loading, handleLogin}= useAuth()
    const navigate= useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email, password})
        navigate('/')

    }

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
           <div className='form-container'>
            <h1>Welcome back</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name="email" placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" name="password" placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>Login</button>
                <div className="auth-footer">
                Don't have an account? <a href="/register">Register</a>
                </div>

            </form>
           </div>
        </main>
    )
}

export default Login