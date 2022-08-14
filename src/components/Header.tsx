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
    
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          {!session && (
            <a
              href="#"
              onClick={handleSignin}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </a>
          )}
          {session && (
            <a
              href="#"
              onClick={handleSignout}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign out
            </a>
          )}
        </div>
    </div>
  );
};

export default Header;
