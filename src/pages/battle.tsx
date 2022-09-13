import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import SimpleTable from "../components/SimpleTable";
import { useState } from "react";

const commitAttack = (setAttack: any) => {
    const data = {
        turn: 1,
        battleId: 1,
        playerMove: [
            {
                turn_id: 1,
                player_id: "cl75stydk000909mh7nnpp7xa",
                type_name: "Art",
                move_name: "Fire Blast",
                source_id: 1,
                targets: [
                    {
                        target_id: 2,
                    },
                ],
            },
        ],
    };

    fetch("api/battle/setPlayerMove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setAttack(data);
        });
};

const commitBattle = (setBattle: any) => {
    fetch("api/battle/battle", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setBattle(data);
        });
};

const reset = () => {
    fetch("api/battle/reset", {
        method: "GET",
    });
};

const Home: NextPage = () => {
    const [attack, setAttack] = useState({});
    const [battle, setBattle] = useState({});

    return (
        <div className="mx-auto px-4 sm:px-6">
            <Header />
            <main>
                <div className="relative m-auto h-[64rem] w-5/6">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => reset()}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => commitAttack(setAttack)}
                    >
                        Attack!
                    </button>
                    <pre>{JSON.stringify(attack, null, "\t")}</pre>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => commitBattle(setBattle)}
                    >
                        Battle!
                    </button>
                    <pre>{JSON.stringify(battle, null, "\t")}</pre>
                </div>
            </main>
        </div>
    );
};

export default Home;
