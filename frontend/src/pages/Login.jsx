import { Input,Button } from "@material-tailwind/react";
import { useState } from "react";
import {Eye,EyeOff} from "lucide-react"
function Login() {

  const [formFields, setFormFields] = useState({
    email: '',
    password:''
  })

  const [pwd, setPwd] = useState("password");

  const handleFields = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields,[name]:value})
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(formFields.email + " " + formFields.password)
    setFormFields({...formFields,
      email: '',
      password:''
    })
    setPwd('password');
  }

  const togglePasswordVisibility = () => {
    setPwd(pwd === 'password' ? 'text' : 'password');
  }


  return (
    <div className="w-8/12 md:w-4/12 py-20 px-20 mx-auto bg-gray-100 rounded-xl my-9">
      <h1 className="text-center text-xl font-medium my-5">Login</h1>
      <form className="w-full space-y-8" onSubmit={handleLoginSubmit}>
        <Input type="email" label="Email" size="lg" color="purple" name="email" value={formFields.email} onChange={handleFields} />
        <Input type={pwd} label="Password" size="lg" color="purple" name="password" value={formFields.password} onChange={handleFields} icon={pwd==='password'?(<EyeOff size={18} onClick={togglePasswordVisibility} className="cursor-pointer"/>):(<Eye size={18} onClick={togglePasswordVisibility} className="cursor-pointer"/>)} />
        <div className="mx-auto w-fit">
          <Button type="submit" variant="outlined" color="purple">Login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login