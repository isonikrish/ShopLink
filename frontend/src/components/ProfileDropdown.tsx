import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/stores/userStore";
import { LogOut, Store } from "lucide-react";
import {Link} from 'react-router-dom'
function ProfileDropdown() {
  const { user, logout } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 shadow-md">
        <DropdownMenuItem className="flex items-center gap-3 p-3 cursor-pointer border-b">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.name}</span>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </DropdownMenuItem>
        <Link to="/create-shop">
        <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted">
          <Store className="w-4 h-4" />
          <span>Create Shop</span>
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
