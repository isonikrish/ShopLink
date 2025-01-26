import Login from "@/components/Login";
import Signup from "@/components/Signup"
import { useState } from "react"

function Authentication() {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
        {isLogin ? <Login setIsLogin={setIsLogin}/> : <Signup setIsLogin={setIsLogin}/>}
    </div>
  )
}

export default Authentication