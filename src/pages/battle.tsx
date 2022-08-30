import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import SimpleTable from "../components/SimpleTable";

const Home: NextPage = () => {
    return (
        <div className="mx-auto px-4 sm:px-6">
            <Header />
            <main>
                <div className="relative m-auto h-[64rem] w-5/6">
                    <Image
                        className="object-contain object-top"
                        src="/battle_placeholder.jpeg"
                        alt=""
                        layout="fill"
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;
