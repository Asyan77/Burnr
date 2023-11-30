import './SignInForm.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/sessionsReducer';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)
  let burnrLogoBike = "assets/logos/burnrLogoBike.png"

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({email: email, password: password}))
  };

  const demoUser = async (e) => {
    e.preventDefault()

    const demoEmail = 'zach@mail.com'
    const demoPassword = 'zachword'

    return await dispatch(loginUser({email: demoEmail, password: demoPassword}))
  }
  
    if(currentUser) {
      return <Redirect to='/photos'/>
    }

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