import './NewUserForm.css'
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../../store/session';
import { createUser } from '../../store/user';


function NewUserForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])
  const userData = [username, email, password]
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const currentUser = useSelector(state => state.session.currentUser);
  // const user = useSelector(state => state.user.find())
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
   
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [username, email, password] = userData
    const newUser = { username: username, email: email, password: password }
    const data = await dispatch(createUser(newUser))
    if(data) {
      setErrors(data)
    }
  }

  const demoUser = async (e) => {
    e.preventDefault()
    const demoEmail = 'zach@mail.com'
    const demoPassword = 'zachword'
    return await dispatch(loginUser({email: demoEmail, password: demoPassword}))
  }

  const showErrors = () => {
    if(!errors.length) return null
    return (
      <ul className='errors'>
        {errors.map((error,idx )=> <li key ={idx} className='error'>{error}</li>)}
      </ul>
    )
  }

  useEffect(() => {
  },[handleSubmit])

  if (currentUser) return <Navigate to='/explore' replace={true}/>

  return (
    <div className='outer-form-box-SU'>
      <form className='form-SU' onSubmit={handleSubmit}>
          <img src="/assests/logos/burnrLogo2.png" className='form-logo-SU' alt='burnr-logo'/>
          <div className='header-SU'>Sign Up for Burnr</div>
          {showErrors()}
          <div className='form-fields-SU'>
            <input className='username-field-SU' type="text" value={username} placeholder='Username' onChange={handleUsernameChange} ref={usernameInput} required={true}/>
            <input className='email-field-SU' type="email" value={email} placeholder='Email' onChange={handleEmailChange} ref={emailInput} required={true}/>
            <input className='password-field-SU' type="password" value={password} placeholder='Password' onChange={handlePasswordChange} ref={passwordInput} required ={true} />
          </div>
          <div className='btns-bottom-of-form-SU'>
            <button className='sign-up-btn-SU' type='submit' onClick={()=> handleSubmit}>Sign Up</button>
            <br/>
            <button className='demo-sign-up-btn-SU' onClick={event => demoUser(event)}>Demo User</button>                     
          </div>
          <div className='already-a-member-sign-up-SU'> Already a Burnr member?  
            <Link to='/login' style={{ textDecoration: 'none', color: 'rgb(0,130,199)' }}> Log in here.</Link>
          </div>
      </form>
     </div> 
  );
}

export default NewUserForm;