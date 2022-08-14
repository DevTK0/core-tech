import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const handleSignin = (e: React.SyntheticEvent) => {
  e.preventDefault();
  signIn();
};

const handleSignout = (e: React.SyntheticEvent) => {
  e.preventDefault();
  signOut();
};

const Header: NextPage = () => {

  const { data: session } = useSession();

  return (
        <nav className="">
            <div className="w-full py-6 flex items-center justify-end border-b border-indigo-500 lg:border-none">
                <div className="flex items-center mr-auto"> 
                    <a href="/">
                        <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt=""
                        />
                    </a>
                    <div className="ml-10 space-x-8 block">
                        <a href="/explore" className="text-base font-medium">
                            Explore
                        </a>
                        <a href="/manage" className="text-base font-medium">
                            Manage
                        </a>
                        <a href="/battle" className="text-base font-medium">
                            Battle
                        </a>
                    </div>
                    
                </div>
                <div className="ml-10 space-x-4">
                    {!session && (
                        <a
                        href="#"
                        onClick={handleSignin}
                        className="inline-block mr-0 bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                        >
                        Sign in
                        </a>
                    )}
                    {session && (
                        <a
                        href="#"
                        onClick={handleSignout}
                        className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                        >
                        Sign out
                        </a>
                    )}
                    </div>
            </div>
        </nav>
  );
};

export default Header;
