import './NewUserForm.css'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../../store/session';
import { createUser } from '../../store/user';


function NewUserForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = [username, email, password]
  const user = useSelector(state => state.session.currentUser);
  let burnrLogoBike = "assets/logos/burnrLogoBike.png"

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [username, email, password] = userData
    const newUser = { username: username, email: email, password: password }
    dispatch(createUser(newUser))
  }

  const demoUser = async (e) => {
    e.preventDefault()
    const demoEmail = 'zach@mail.com'
    const demoPassword = 'zachword'
    return await dispatch(loginUser({email: demoEmail, password: demoPassword}))
  }

  if (user) return <Navigate to='/explore' replace={true}/>

  return (
    <div className='outer-form-box'>
        <div className='sign-up-form'>
            <form onSubmit={handleSubmit}>
                <img src={burnrLogoBike} className='form-logo' alt='burnr-logo'/>
                <h2>Sign Up for Burnr</h2>
                <div className='form-fields'>
                  <input className='playaname-field' type="text" id="playaName" value={username} placeholder='Username/Playa Name' onChange={handleUsernameChange} required={true}/>
                  <input className='email-field' type="email" value={email} placeholder='Email' onChange={handleEmailChange} required={true}/>
                  <input className='password-field' type="password" id="password" value={password} placeholder='Password' onChange={handlePasswordChange} required ={true} />
                </div>
                <div className='btns-bottom-of-form'>
                  <button className='sign-up-btn' type='submit' onClick={event => demoUser(event)}>Sign Up</button>
                  <br/>
                  <button className='demo-sign-up-btn' onClick={event => demoUser(event)}>Demo User</button>                     
                  <div className='already-a-member-sign-up'> Already a Burnr member? <Link to='/login' style={{ textDecoration: 'none', color: 'rgb(0,130,199)' }}>Log in here.</Link></div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default NewUserForm;