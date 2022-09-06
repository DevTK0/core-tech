import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import SimpleTable from "../components/SimpleTable";
import { useState } from "react";

const Home: NextPage = () => {
    const [board, setBoard] = useState({});

    return (
        <div className="mx-auto px-4 sm:px-6">
            <Header />
            <main>
                <div className="relative m-auto h-[64rem] w-5/6">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Attack!
                    </button>
                    <pre>{JSON.stringify(board, null, "\t")}</pre>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Battle!
                    </button>
                    <pre>{JSON.stringify(board, null, "\t")}</pre>
                </div>
            </main>
        </div>
    );
};

export default Home;
