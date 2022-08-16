import type { NextPage } from "next";
import Header from "../components/Header";
import {
  SearchIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

const tabs = [
  { name: "Familiars", href: "#", current: true },
  { name: "Items", href: "#", current: false },
  { name: "Moves", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function switchTabs(current: any) {
  tabs.forEach((tab) => {
    tab.current = (tab === current) ? true : false;
  });
}

const Home: NextPage = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 ">
      <Header />
      <main>
        <div className="pt-10 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">InfoDex</h1>
            <p className="mt-2 text-sm text-gray-700">
              Search for information on Familiars.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
        </div>
        <div className="mt-8 border-b border-gray-200 flex justify-end">
          <div className="items-baseline flex mr-auto">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Filter By
            </h3>
            <div className="mt-4 sm:mt-0 sm:ml-10">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <Link href={tab.href} key={tab.name}>
                  <a
                    onClick={() => switchTabs(tab)}
                    className={classNames(
                      tab.current
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex relative  border-gray-200 pb-2">
            <div className="absolute inset-y-0 left-0 pl-3 pb-2 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="pl-10 text-sm border rounded-full"
              placeholder="Search"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
