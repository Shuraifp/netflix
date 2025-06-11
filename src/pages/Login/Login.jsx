import React,{useState} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login, signup} from '../../firebase'
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Login() {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  const handleToggle = () => {
    setShowPassword(!showPassword);
    if (icon === eye) {
      setIcon(eyeOff);
    } else {
      setIcon(eye);
    }
  }
  return (
    loading ? <img className='login-spinner' src={netflix_spinner} alt=""/> :
    <div>
      <div className="login">
        <img src={logo} alt=""  className='login-logo'/>
        <div className="login-form">
          <h1>{signState}</h1> 
          <form>
            { signState === "Sign Up" && <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />}
            <input type="email" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='relative'>
            <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="eye" onClick={handleToggle}>
                  <Icon icon={icon} size={25}/>
              </span>
            </div>
            <button onClick={user_auth} type="submit">{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            { signState === "Sign Up"? <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In</span></p>: <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
