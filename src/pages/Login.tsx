import { FormEvent, useState } from "react"
import { client } from "../supabase/client"

const Login = () => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = async (e : FormEvent<HTMLFormElement> ) => { 
    e.preventDefault()
    try {
      await client.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: 'http://localhost:5173',
        }
      })
      setError(false)
    }
    catch (error) { 
      console.log(error)
      setError(true)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name='email' placeholder='example@gmail.com' onChange={(e) => { 
        setEmail(e.target.value)
      }}/>  
      <button>Send</button>
      {
        error && <p>Something went wrong</p>
      }
    </form>
  )
}

export default Login