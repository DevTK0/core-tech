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
import lottie, { AnimationItem } from "lottie-web";

const moveTo = (zoom: any, setZoom: any, toggle: any, setToggle: any) => {
    setZoom(!zoom);
    setToggle(!toggle);
};

let animation: AnimationItem | null;

const playMove = (element: RefObject<HTMLInputElement>) => {
    if (animation) return;

    animation = lottie.loadAnimation({
        container: element.current!, // the dom element that will contain the animation
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "animation.json", // the path to the animation json
    });

    animation.playSpeed = 1;

    animation.addEventListener("complete", () => {
        animation!.destroy();
        animation = null;
        console.log("destroyed");
    });
};

const Home: NextPage = () => {
    const [showMenu, setShowMenu] = useState<any>(false);
    const game = useRef<HTMLInputElement>(null);
    const mon1 = useRef<HTMLInputElement>(null);
    const canvas = useRef<HTMLInputElement>(null);
    const animation = useRef<HTMLInputElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [shift, setShift] = useState(true);
    const [zoom1, setZoom1] = useState(false);
    const [zoom2, setZoom2] = useState(false);
    const [zoom3, setZoom3] = useState(false);
    const [zoom4, setZoom4] = useState(false);
    const [zoom5, setZoom5] = useState(false);
    const [zoom6, setZoom6] = useState(false);

    const [showMsgBox, setShowMsgBox] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showMoves, setShowMoves] = useState(false);

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
                        className={`relative m-auto h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] overflow-hidden `}
                    >
                        {/* ====== Background Layer ====== */}
                        <div
                            ref={canvas}
                            className={`${
                                zoom1 &&
                                "-translate-x-[0vw] translate-y-[10vh] scale-150"
                            } 
                            ${
                                zoom2 &&
                                "-translate-x-[30vw] translate-y-[10vh] scale-150"
                            } ${
                                zoom3 &&
                                "-translate-x-[60vw] translate-y-[10vh] scale-150"
                            }
                            ${
                                zoom4 &&
                                "translate-x-[60vw] -translate-y-[20vh] scale-150"
                            }
                            ${
                                zoom5 &&
                                "translate-x-[30vw] -translate-y-[20vh] scale-150"
                            }
                            ${
                                zoom6 &&
                                "translate-x-[0vw] -translate-y-[20vh] scale-150"
                            } absolute top-0 left-0 h-[100vh] max-h-[50vw] w-[200vh] max-w-[100vw] transition duration-300`}
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

                            {/* sky */}
                            <div className="absolute h-[50vh] w-[800vw] -translate-x-[50vw] -translate-y-[15vh] bg-gradient-to-t from-blue-500 to-blue-100"></div>
                            {/* grass */}
                            <div className="absolute h-[200vh] w-[800vw] -translate-x-[50vw] translate-y-[20vh] bg-green-500"></div>
                            {/* center line */}
                            <div className="absolute top-1/2 h-0 w-full border border-black"></div>
                            <div className="absolute right-10 top-0 flex h-1/2 w-full flex-row items-end justify-end space-x-14">
                                <div
                                    ref={mon1}
                                    className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500"
                                ></div>
                                {/* <div className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500">
                                </div>
                                <div className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500">
                                </div> */}
                            </div>
                            <div className="absolute left-10 bottom-5 flex h-1/2 w-full flex-row items-end space-x-14">
                                <div className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500"></div>
                                {/* <div className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500">
                                </div>
                                <div className="h-1/2 w-[12.5%] rounded-[50%] bg-gray-500">
                                </div> */}
                            </div>
                        </div>

                        <div
                            ref={animation}
                            className="absolute h-full w-full"
                        ></div>

                        {/* ====== Foreground Layer ====== */}

                        {/* ====== UI Layer - Enemy status ====== */}

                        <div className="absolute top-2 right-5 flex flex-row space-x-5">
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>
                        </div>

                        {/* ====== UI Layer - Ally status ====== */}

                        <div className="absolute bottom-2 left-5 flex flex-row space-x-5">
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-10 py-5">HP : 100</div>
                            </div>
                        </div>

                        {/* ====== UI Layer - Familiar Attack Menu ====== */}
                        <div
                            className={`${
                                !showMoves && "hidden w-0"
                            } absolute right-0 h-full w-4/5 bg-black`}
                        >
                            <div className="absolute right-20 flex h-full w-4/5 flex-row justify-end overflow-auto">
                                <div className="flex h-full w-full flex-wrap space-y-5 p-5">
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Attack
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Art 1
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Art 2
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Art 3
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Art 4
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ====== UI Layer - Familiar Details Menu ====== */}

                        <div
                            className={`${
                                !showDetails && "hidden w-0"
                            } lg:4-full absolute right-0 h-full w-4/5 bg-black `}
                        >
                            <div className="absolute right-20 flex h-full w-full flex-row justify-end overflow-auto">
                                <div className="flex h-full w-2/5 flex-wrap space-y-5 p-5">
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 1
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 2
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 3
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 4
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 5
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 6
                                    </div>
                                </div>
                                <div className="flex h-full w-2/5 flex-wrap space-y-5 p-5">
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 1
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 2
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 3
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 4
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 5
                                    </div>
                                    <div className="w-full flex-auto rounded-lg bg-white p-4">
                                        Familiar 6
                                    </div>
                                </div>
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
                                onClick={() => setShowDetails(!showDetails)}
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
                                    onClick={() =>
                                        moveTo(zoom1, setZoom1, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        1
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() =>
                                        moveTo(zoom2, setZoom2, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        2
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() =>
                                        moveTo(zoom3, setZoom3, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        3
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() =>
                                        moveTo(zoom4, setZoom4, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        4
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() =>
                                        moveTo(zoom5, setZoom5, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        5
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() =>
                                        moveTo(zoom6, setZoom6, shift, setShift)
                                    }
                                >
                                    <div className="h-5 w-5 md:h-6 md:w-6">
                                        6
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() => setShowMoves(!showMoves)}
                                >
                                    <BoltIcon className="h-5 w-5 md:h-6 md:w-6"></BoltIcon>
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        showMenu ? "" : "hidden"
                                    }  mr-5 items-center rounded-full border border-transparent bg-white p-1.5 text-red-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:p-3`}
                                    onClick={() => playMove(mon1)}
                                >
                                    <ShieldExclamationIcon className="h-5 w-5 md:h-6 md:w-6"></ShieldExclamationIcon>
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
                            onClick={() => setShowMsgBox(!showMsgBox)}
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
