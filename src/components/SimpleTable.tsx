import type { NextPage } from "next";
import { useState } from "react";

const add = (rows: any, setRows:any) : void => {
  
  setRows([
    {
      id: 1,
      familiar: "John Doe",
      item: "Item 1",
      move1: "Move 1",
      move2: "Move 2",
      move3: "Move 3",
      move4: "Move 4",
    },
    ...rows
  ]);
  
  console.log(rows);
}

const remove = (rows: any, setRows:any) : void => {
  
  rows.pop();
  setRows([...rows]);

}

const SimpleTable: NextPage = () => {
  
  const [rows, setRows] = useState([
    {
      id: 1,
      familiar: "John Doe",
      item: "Item 1",
      move1: "Move 1",
      move2: "Move 2",
      move3: "Move 3",
      move4: "Move 4",
    }
  ]);

  return (
    <>
      <div className="pt-10 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Team Manager</h1>
          <p className="mt-2 text-sm text-gray-700">
            Choose the familiars to bring with you into battle.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-8 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Familiar
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Move 1
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Move 2
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Move 3
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Move 4
                    </th>
                    <th scope="col" className="px-10 w-10 py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                        
                    </th>
                    <th scope="col" className="px-relative py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                        <a
                          onClick={() => add(rows, setRows)}
                          className="bg-indigo-600 px-2 py-1 border border-transparent rounded-md text-white"
                        >
                          + 
                        </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rows.map((row: any) => (
                    <tr key={row.id}>
                      <td className="whitespace-nowrap py-8 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {row.familiar}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500">
                        {row.item}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500">
                        {row.move1}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500">
                        {row.move2}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500">
                        {row.move3}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm text-gray-500">
                        {row.move4}
                      </td>
                      <td className="whitespace-nowrap w-10 px-relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 py-4"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="whitespace-nowrap w-10 px-relative py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                        <a
                          onClick={() => remove(rows, setRows)}
                          className="bg-red-600 px-2 py-1 border border-transparent rounded-md text-white"
                        >
                          X
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleTable;
