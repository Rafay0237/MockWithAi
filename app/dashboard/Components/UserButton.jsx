"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { doSocialLogout } from '@/app/actions';

const UserButton =  ({ user }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-transparent border-none hover:bg-transparent ">
        <Button variant="outline">
          {user?.image && (
            <img
              src={user.image}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={()=>doSocialLogout()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

