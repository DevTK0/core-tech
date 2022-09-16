import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import { RefObject, useEffect, useRef, useState } from "react";
import {
    PlusIcon,
    BoltIcon,
    MagnifyingGlassIcon,
    ShieldExclamationIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

const moveTo = (
    canvas: RefObject<HTMLInputElement>,
    toggle: any,
    setToggle: any
) => {
    if (toggle) canvas.current!.style.transform = "translate(100px, 0px)";
    else canvas.current!.style.transform = "translate(0px, 0px)";

    setToggle(!toggle);
};

const Home: NextPage = () => {
    const [showMenu, setShowMenu] = useState<any>(false);
    const game = useRef<HTMLInputElement>(null);
    const mon1 = useRef<HTMLInputElement>(null);
    const canvas = useRef<HTMLInputElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [toggle, setToggle] = useState(true);
    const [showMsgBox, setShowMsgBox] = useState(false);

    const [transform, setTransform] = useState({});

    useEffect(() => {
        game!.current!.scrollIntoView();

        const resize = () => {
            setWidth(game!.current!.offsetWidth);
            setHeight(game!.current!.offsetHeight);

            const temp = {
                transform: `scale(${game!.current!.offsetWidth / 1024})`,
            };
            setTransform(temp);
            console.log(temp);
        };

        resize();

        window.addEventListener("resize", resize);
    }, []);

    return (
        <div>
            <div className="mx-auto px-4 md:block portrait:block">
                <Header />
            </div>
            <main>
                <div className="landscape:hidden">
                    Please use landscape mode.
                </div>

                {/* actual game */}
                <div className="portrait:hidden">
                    <div
                        ref={game}
                        className="relative m-auto h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] overflow-hidden border-4 border-red-200"
                    >
                        {/* ====== Background Layer ====== */}
                        <div
                            ref={canvas}
                            className="absolute top-0 left-0 h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] bg-green-400"
                        >
                            {/* <div className="inline border-2 bg-cyan-700">
                                <Image
                                    src="/sample.png"
                                    alt="Picture of the author"
                                    layout="responsive"
                                    width={40000}
                                    height={20000}
                                />
                            </div> */}
                            {/* <div
                                ref={mon1}
                                className="absolute right-[5vw] top-[5vw] inline-block h-[10vw] w-[10vw] rounded-[50%] bg-gray-500 "
                            ></div>
                            <div className="absolute bottom-[5vw] left-[5vw] inline-block h-[10vw] w-[10vw] rounded-[50%] bg-gray-500"></div>
                            <div className="absolute -left-[10vw] bottom-[5vw] inline-block h-[10vw] w-[10vw] rounded-[50%] bg-gray-500 hover:bg-red-500"></div> */}
                        </div>

                        {/* ====== Foreground Layer ====== */}

                        {/* ====== UI Layer - Enemy status ====== */}

                        <div className="absolute top-2 right-5 flex flex-row">
                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>

                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>

                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>
                        </div>

                        {/* ====== UI Layer - Ally status ====== */}

                        <div className="absolute bottom-2 left-5 flex flex-row">
                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>

                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>

                            <div className="mr-5 overflow-hidden rounded-lg bg-white shadow">
                                <div className="top:0 px-4 py-5">HP : 100</div>
                            </div>
                        </div>

                        {/* ====== UI Layer - Menu ====== */}

                        <div className="absolute bottom-5 right-5 flex flex-col items-end">
                            {"width: " + width + " height: " + height}
                            <button
                                type="button"
                                className={`mb-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                onClick={() => setShowMsgBox(!showMsgBox)}
                            >
                                <MagnifyingGlassIcon
                                    className="h-5 w-5 md:h-6 md:w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                type="button"
                                className={`mb-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                onClick={() =>
                                    moveTo(canvas, toggle, setToggle)
                                }
                            >
                                <ArrowPathIcon
                                    className="h-5 w-5 md:h-6 md:w-6"
                                    aria-hidden="true"
                                />
                            </button>
                            <div>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                >
                                    <ShieldExclamationIcon
                                        className="h-5 w-5 md:h-6 md:w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                >
                                    <BoltIcon
                                        className="h-5 w-5 md:h-6 md:w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className=" items-center rounded-full border border-transparent bg-red-600 p-1.5 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3"
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    <PlusIcon
                                        className="h-5 w-5 md:h-6 md:w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* ====== UI Layer - Message Box ====== */}
                        <div
                            className={`${
                                showMsgBox ? "" : "hidden"
                            } absolute bottom-0 w-full border bg-gray-800/90`}
                        >
                            <div className="px-7 py-7 text-white">
                                Familiar was Knocked Out!
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
