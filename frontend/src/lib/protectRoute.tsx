import { useUser } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({children}: {children: JSX.Element}){
    const navigate = useNavigate();
    const {user} = useUser();
    if(!user) navigate("/login");
    return children;
}