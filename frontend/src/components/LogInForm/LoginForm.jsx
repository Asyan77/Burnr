import './LoginForm.css'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../../store/session';


function LogInForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useSelector(state => state.session.currentUser)
  const [errors, setErrors] = useState([])
  let burnrLogoBike = "assets/logos/burnrLogoBike.png"

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    dispatch(loginUser ({email: email, password: password}))
  };

  const demoUser = async (e) => {
    e.preventDefault()
    const demoEmail = 'zach@mail.com'
    const demoPassword = 'zachword'
    return await dispatch(loginUser({email: demoEmail, password: demoPassword}))
  }
  
  if (currentUser) return <Navigate to='explore' replace={true} />
  
  return (
    <div className='outerFormBox'>
      <div className="sign-in-box">
        <form onSubmit={handleSubmit}>
          <img src={burnrLogoBike} className='form-logo' alt='burnr-logo'/>
          <h2>Log In to Burnr</h2>
          <div className='form-fields'>
            <input className='email-btn' type="text" id="email" value={email} placeholder='Email' onChange={handleEmailChange} required/>
            <input className='password-btn' type="password" id="password" value={password} placeholder='Password' onChange={handlePasswordChange} required/>
          </div>
          <div className='btns-bottom-of-form'>
              <button className='sign-in-btn' type="submit">Sign In</button>
                <br></br>
              <button className='demo-sign-up-btn' onClick={event => demoUser(event)}>Demo User</button>
            <div className='gray-line' />
              <div className='already-a-member-sign-up'> Not a Burnr member? <Link to='/signup' style={{ textDecoration: 'none', color: 'rgb(0,130,199)' }}>Sign up here.</Link></div>       
           </div>
        </form>
      </div>
   </div>
  );
}

export default LogInForm;