import './LoginForm.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../../store/session';
import bikeLogo from "/assets/logos/burnr-logo-bike.png"


function LogInForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useSelector(state => state.session.currentUser)
  const [errors, setErrors] = useState([])
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(loginUser ({email: email, password: password}))
    if (data) {
      setErrors(data)
    } else {
      setErrors([])
    }
  };
  
  const demoUser = async (e) => {
    e.preventDefault()
    const demoEmail = 'zach@mail.com'
    const demoPassword = 'zachword'
    return await dispatch(loginUser({email: demoEmail, password: demoPassword}))
  }

  const showErrors = ()=> {
    if (!errors.length) return null
    return (
      <ul className='errors-list'>
         {errors.map((error, ind) => <li key={ind} className='login-error'>{error}</li>) }
      </ul>
    )
  }
  
  if (currentUser) return <Navigate to='/explore' replace={true} />
  
  return (
    <div className='login-page'>
      <div className='outer-form-box-LI'>
          <form className="form-LI" onSubmit={handleSubmit}>
            <img src={bikeLogo} className='form-logo-LI' alt='burnr-logo'/>
            <div className='header-LI'>Log In to Burnr</div>
            {showErrors()}
            <div className='form-fields-LI'>
              <input className='email-field-LI' type="text" id="email" value={email} placeholder='Email' onChange={handleEmailChange} required/>
              <input className='password-field-LI' type="password" id="password" value={password} placeholder='Password' onChange={handlePasswordChange} required/>
            </div>
            <div className='btns-bottom-of-form-LI'>
                <button className='sign-in-btn-LI' type="submit">Sign In</button>
                  <br></br>
                <button className='demo-sign-up-btn-LI' onClick={event => demoUser(event)}>Demo User</button>
            </div>
            <div className='already-a-member-sign-up-LI'> Not a Burnr member? <Link to='/signup' style={{ textDecoration: 'none', color: 'rgb(0,130,199)' }}>Sign up here.</Link></div>       
          </form>
      </div>
    </div>
  );
}

export default LogInForm;