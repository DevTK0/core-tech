import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import {
    PlusIcon,
    BoltIcon,
    MagnifyingGlassIcon,
    ShieldExclamationIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
    const [showMenu, setShowMenu] = useState<any>(false);
    const game = useRef<HTMLInputElement>(null);

    useEffect(() => {
        game!.current!.scrollIntoView();
    }, []);

    return (
        <div>
            <div className="mx-auto px-4 sm:px-6">
                <Header />
            </div>
            <main>
                <div className="landscape:hidden">
                    Please use landscape mode.
                </div>
                <div className="pt-10 portrait:hidden">
                    <div
                        ref={game}
                        className="relative m-auto h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] overflow-visible border-4 border-green-300"
                    >
                        <div className="absolute bottom-5 right-5 flex flex-col items-end">
                            <button
                                type="button"
                                className={`mb-5 items-center rounded-full border border-transparent bg-white p-3 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            >
                                <MagnifyingGlassIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                type="button"
                                className={`mb-5 items-center rounded-full border border-transparent bg-white p-3 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            >
                                <ArrowPathIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-3 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <ShieldExclamationIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-3 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <BoltIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className=" items-center rounded-full border border-transparent bg-red-600 p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    <PlusIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 left-0 bottom-0 right-0 -z-10 bg-red-200">
                            <div className="inline h-[200px] w-[500px] border-2 bg-cyan-700">
                                Familiar
                            </div>
                            <div className="float-right inline h-[200px] w-[500px] border-2 bg-cyan-700">
                                background
                                <Image
                                    src="/CameraDemoMap.png"
                                    alt="Picture of the author"
                                    layout="fill"
                                />
                            </div>
                            <div className="bottom-0 inline h-[500px] w-[500px] border-2 bg-cyan-700">
                                Magus
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
