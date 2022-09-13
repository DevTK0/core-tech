import type { NextPage } from "next";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
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
                <div className="pt-10 sm:flex sm:items-center portrait:hidden">
                    <div
                        ref={game}
                        className="relative m-auto h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] overflow-visible border-4 border-green-300"
                    >
                        <div className="absolute  bg-gray-200">
                            <button
                                type="button"
                                className="bottom-0 inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm "
                            >
                                UI
                            </button>
                        </div>
                        <div className="absolute -top-10 left-0 bottom-0 right-0 -z-10 bg-red-200">
                            <div className="inline h-[200px] w-[500px] border-2 bg-cyan-700">
                                Familiar
                            </div>
                            <div className="float-right inline h-[200px] w-[500px] border-2 bg-cyan-700">
                                background
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
