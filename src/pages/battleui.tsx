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
                        className="relative m-auto h-[100vh] max-h-[50vw] w-[200vh] max-w-[200vh] border bg-green-200"
                    >
                        <div>hi</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
