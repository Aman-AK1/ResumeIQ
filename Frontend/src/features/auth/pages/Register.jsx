import React from 'react' 
import {useNavigate, Link} from 'react-router';

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

const navigate = useNavigate()

    return (
        <main>
           <div className='form-container'>
            <h1>hello, Register here</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Username</label>
                    <input type="email" id="email" name="email" placeholder='Enter username'/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>Login</button>
                <div className="auth-footer">
                Already have an account? <a href="/login">Login</a>
                </div>

            </form>

           </div>
        </main>
    )
}

export default Register