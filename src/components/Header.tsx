import type { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
            <div className="flex w-full items-center justify-end border-none py-6">
                <div className="mr-auto flex items-center">
                    <Link href="/">
                        <a>
                            <Image
                                className="h-8 w-auto sm:h-10"
                                src="/favicon.ico"
                                alt=""
                                width={40}
                                height={40}
                            />
                        </a>
                    </Link>
                    <div className="ml-10 block space-x-8">
                        <Link href="/explore">
                            <a className="text-base font-medium">Explore</a>
                        </Link>
                        <Link href="/manage">
                            <a className="text-base font-medium">Manage</a>
                        </Link>
                        <Link href="/battle">
                            <a className="text-base font-medium">Battle</a>
                        </Link>
                        <Link href="/battleui">
                            <a className="text-base font-medium">BattleUI</a>
                        </Link>
                    </div>
                </div>
                <div className="ml-10 space-x-4">
                    {!session && (
                        <Link href="#">
                            <a
                                onClick={handleSignin}
                                className="mr-0 inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Sign in
                            </a>
                        </Link>
                    )}
                    {session && (
                        <Link href="#">
                            <a
                                onClick={handleSignout}
                                className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Sign out
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
