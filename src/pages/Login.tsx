
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import FormInput from '../components/ui/FormInput';
import { useForm } from "react-hook-form"
import gmail from '../assets/gmail.png'
import instagram from '../assets/instagram.png'
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(8, "La contraseña se compone de al menos 8 caracteres"),
})

const Login = () => {
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()
  const { toast } = useToast()
  const resolver = zodResolver(schema);
  const form = useForm({ defaultValues: { email: "", password: "" }, resolver })

  async function signInWithEmail({email, password}: {email: string, password: string}) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) { 
      toast({
        title: "Error de inicio",
        description: "La combinación de email y contraseña no se corresponde con ningún usuario",
        duration:3000
      })
    }
  }
  const signInWithGoogle = async () => { 
    const { data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      toast({
        title: "Error",
        description: error.message,
      })
    } else { 
      toast({
        title: "Inicio de sesión exitoso",
        description: JSON.stringify(data),
      })
    }
  }
  const onSubmit = (data: z.infer<typeof schema>) => { 
    console.log(data)
    signInWithEmail(data)
  }
  const recoveryPassword = async () => { 
    const { data, error } = await supabase.auth.resetPasswordForEmail('fragilgon@email.com')
    console.log({data})
  }

  if (user) { 
    navigate('/teams/1/dashboard')
  } 
  return (
    <div className="flex flex-col items-center justify-center h-screen " style={{background: "linear-gradient(170deg, #007700 65%, #4F4f4f 66%)"}}> 
      <Card className="w-[350px] h-[450px] flex flex-col items-center justify-center border-2" style={{background: "linear-gradient(170deg, #4F4f4f 75%, #007700 76%)"}}>
        <CardHeader>
          <CardTitle className="text-white font-bold text-2xl tracking-widest	">
            TEAM MANAGER
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full ">
          <Form {...form}>
            <FormInput control={form.control} name={"email"} placeholder={"example@domain.com"} label="Email" className="bg-white" labelClassName="text-white"/>
            <FormInput control={form.control} name={"password"} placeholder={"*******"} label="Password" type="password" className="bg-white" labelClassName="text-white"/>
          </Form>
          <div className=" flex flex-col items-center mx-10">
          <Button variant={'login'} className="flex w-full gap-4 justify-center mt-4" onClick={form.handleSubmit(onSubmit)}>
              Iniciar sesión
            </Button>
            <Button variant={'login'} className="flex w-full gap-4 justify-start mt-4" onClick={()=> signInWithGoogle()}>
              <img src={gmail} alt="gmail icon" className="h-5 w-5" />
              <span >Acceder con Gmail</span>
            </Button>
            <Button variant={'login'} className="flex w-full gap-4 justify-start mt-4 " onClick={() => { 
              toast({
                title: "Conectarse a través de instagram",
                description: "Esta funcionalidad aún está en desarrollo",
              })
            }}>
              
              <img src={instagram} alt="gmail icon" className="h-5 w-5" />
              <span >Acceder con Instagram</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <span onClick={()=> recoveryPassword()} className="text-white font-bold text-center text-sm cursor-pointer hover:underline hover:text-primary transition-colors duration-300 ease-in-out">¿Prefieres registrarte?</span>
        </CardFooter>
      </Card>
    </div> 

    
  )
}

export default Login