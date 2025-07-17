import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, LucideLoaderCircle, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function DropdownMenuWithIcon() {
  const session = useSession();
  const [pending, setPending] = React.useTransition();
  const router = useRouter();
  const handleLogout = () => {
    setPending(async () => {
      await signOut();
      router.push("/sign-in");
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
        <Avatar>
          {session.isPending ? (
            <AvatarFallback>BS</AvatarFallback>
          ) : session.data?.user?.image ? (
            <AvatarFallback>
              <Image
                src={session.data.user.image || "/card.png"}
                alt={session.data.user.name}
                width={32}
                height={32}
                className="rounded-full size-8"
              />
            </AvatarFallback>
          ) : (
            <AvatarFallback>BS</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuItem>
        {session.data?.session ? (
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            {pending ? (
              <LucideLoaderCircle className="animate-spin duration-500" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Logout
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Link href="/sign-up">
                  <span>Sign Up</span>
                  <LogOut className="h-4 w-4" />
                </Link>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <span>Sign In</span>
                  <LogOut className="h-4 w-4" />
                </Link>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
