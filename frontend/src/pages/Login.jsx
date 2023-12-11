import { Input,Button } from "@material-tailwind/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import validator from 'validator';
import { useLogin } from '../hooks/useLogin';

function Login() {

  const { login, error, isLoading } = useLogin();

  const [formFields, setFormFields] = useState({
    email: '',
    password:''
  })

  const [pwd, setPwd] = useState("password");

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields,[name]:value})
  }

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = formFields
    if (validator.isEmail(email) && validator.isStrongPassword(password)) {

      //alert(email + " " + password)
      await login(email, password);
      setFormFields({...formFields,
        email: '',
        password:''
      })
      setPwd('password');
    }
    else {
      alert("Kindly, Enter valid credentials");
    }
  }

  const togglePasswordVisibility = () => {
    setPwd(pwd === 'password' ? 'text' : 'password');
  }


  return (
    <div className="w-11/12 md:w-4/12 py-20 px-20 mx-auto bg-darkPrimary/30 rounded-xl my-9">
      <h1 className="text-center text-xl font-medium my-5">Login</h1>
      <form className="w-full space-y-8" onSubmit={handleLoginSubmit}>
        <Input type="email" label="Email" size="lg" color="purple" name="email" value={formFields.email} onChange={handleFields} />

          <Input type={pwd} label="Password" size="lg" color="purple" name="password" value={formFields.password} onChange={handleFields} icon={pwd==='password'?(<EyeOff size={18} onClick={togglePasswordVisibility} className="cursor-pointer"/>):(<Eye size={18} onClick={togglePasswordVisibility} className="cursor-pointer"/>)} />

        <div className="mx-auto w-fit">
          <Button type="submit" disabled={isLoading} variant="outlined" color="purple">Login</Button>
        </div>
      </form>
      {error && <p className="text-sm mt-5 px-4 py-3 border-2 border-red-500 bg-white text-red-500 ">{error}</p>}
    </div>
  )
}

export default Login