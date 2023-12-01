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
    <div className='outer-form-box-SU'>
      <form className='form-SU' onSubmit={handleSubmit}>
          <img src="/assests/logos/burnrLogo2.png" className='form-logo-SU' alt='burnr-logo'/>
          <div className='header-SU'>Sign Up for Burnr</div>
          <div className='form-fields-SU'>
            <input className='username-field-SU' type="text" value={username} placeholder='Username' onChange={handleUsernameChange} required={true}/>
            <input className='email-field-SU' type="email" value={email} placeholder='Email' onChange={handleEmailChange} required={true}/>
            <input className='password-field-SU' type="password" value={password} placeholder='Password' onChange={handlePasswordChange} required ={true} />
          </div>
          <div className='btns-bottom-of-form-SU'>
            <button className='sign-up-btn-SU' type='submit' onClick={event => demoUser(event)}>Sign Up</button>
            <br/>
            <button className='demo-sign-up-btn-SU' onClick={event => demoUser(event)}>Demo User</button>                     
          </div>
          <div className='already-a-member-sign-up-SU'> Already a Burnr member?  
          <Link to='/login' style={{ textDecoration: 'none', color: 'rgb(0,130,199)' }}> Log in here.</Link></div>
      </form>
     </div> 
  );
}

export default NewUserForm;