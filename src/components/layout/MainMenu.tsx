import { Button } from "../ui/button"
import { FilePlus, FileText, LogOut, Sun, User as UserIcon} from "lucide-react"
import { 
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger

 } from "../ui/dropdown-menu"
import { Label } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";

interface MainMenuProps {
	user: User | undefined
}

const GradientMenuItem = ({ icon: Icon, children, onClick }
	: {
		icon: React.ComponentType;
		children: React.ReactNode;
		onClick?: () => void;
	}
) => (
  <DropdownMenuItem asChild>
    <Button
      onClick={onClick}
      className="w-full text-left px-3 py-2 flex items-center gap-2
        border rounded-md border-primary/30
        text-xl font-bold
        bg-clip-text text-transparent
        bg-gradient-to-r from-primary to-blue-600"
    >
      {Icon && <Icon />}
      {children}
    </Button>
  </DropdownMenuItem>
);

export default function MainMenu({ user }: MainMenuProps) {
	return (
		<div className="ml-auto flex p-5 gap-5">
		<Label className="text-xl font-bold
        				bg-clip-text text-transparent
        				bg-gradient-to-r from-primary to-blue-600">
			{user?.name}</Label>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button >
					<UserIcon/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 min-w-48 rounded-md border border-primary/30 bg-popover">
				<DropdownMenuSeparator/>
				<GradientMenuItem icon={UserIcon}>
					Аккаунт
				</GradientMenuItem>
				<GradientMenuItem icon={LogOut}> Выйти
				</GradientMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		</div>

	)
}