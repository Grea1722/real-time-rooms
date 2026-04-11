import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {Button} from '../ui/button'
import { BellIcon, LogOutIcon } from "lucide-react"
import { logoutAction } from "@/app/login/actions";

interface UserMenuProps {
  initials?: string;
  avatarUrl?:string | null;
}

const UserMenu = ({ initials, avatarUrl }: UserMenuProps) => {
  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full bg-red-500" size="icon">
                <Avatar >
                  <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} alt="userImg" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-red-600  focus:text-red-600" onClick={async () => await logoutAction()}> 
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UserMenu
