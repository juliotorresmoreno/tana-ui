"use client";

import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { Button } from "flowbite-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex">
        <AppLayout connections={null}>
          <div className="flex flex-1 flex-col gap-2">
            <section className="bg-gray-50 p-3 sm:p-5 flex flex-1">
              <div className="mx-auto max-w-screen-xl px-4 lg:px-12 flex flex-1">
                {/* Start coding here */}
                <div className="bg-white relative shadow-md overflow-hidden flex-1">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <Input
                            type="text"
                            className="pl-10 p-2"
                            placeholder="Search"
                            required
                          />
                        </div>
                      </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                      <Button type="button" className="rounded-none w-[150px]">
                        <svg
                          className="h-3.5 w-3.5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          />
                        </svg>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="flex flex-1">
                          <th scope="col" className="px-4 py-3 flex-1">
                            Name
                          </th>
                          <th scope="col" className="px-4 py-3 w-[200px]">
                            Model
                          </th>
                          <th scope="col" className="px-4 py-3 w-[200px]">
                            Created At
                          </th>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </AppLayout>
      </main>
    </Suspense>
  );
}
