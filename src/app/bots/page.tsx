"use client";

import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { TextArea } from "@/components/Textarea";
import { createMmlu, getMmlus, updateMmlu } from "@/services/mmlu";
import { Mmlu, Model, Response } from "@/types/models";
import { Button, Label, Modal } from "flowbite-react";
import { Suspense, useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Select } from "@/components/Select";
import { useInput } from "@/hooks/useInput";
import toast, { Toaster } from "react-hot-toast";
import { getModels } from "@/services/models";

export default function Page() {
  const nameInput = useInput("");
  const providerInput = useInput("");
  const modelInput = useInput("");
  const photoURLInput = useInput("");
  const descriptionInput = useInput("");
  const [mmlu, setMmlu] = useState<Mmlu | null>(null);
  const [mmlus, setMmlus] = useState<Mmlu[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  async function getData() {
    const response = await getMmlus();
    const data: Mmlu[] = await response.json();
    setMmlus(data);
  }

  async function _getModels() {
    const response = await getModels();
    const data: Model[] = await response.json();
    setModels(data);
  }

  useEffect(() => {
    getData();
    _getModels();
  }, []);

  const handleAdd = () => {
    nameInput.clear();
    providerInput.setValue("ollama");
    modelInput.clear();
    photoURLInput.clear();
    descriptionInput.clear();
    setMmlu(null);
    toggle();
  };

  const handleEdit = (mmlu: Mmlu) => {
    nameInput.setValue(mmlu.name);
    providerInput.setValue(mmlu.provider);
    modelInput.setValue(mmlu.model);
    photoURLInput.setValue(mmlu.photo_url);
    descriptionInput.setValue(mmlu.description);
    setMmlu(mmlu);
    toggle();
  };

  const handleSave = async () => {
    const payload = {
      name: nameInput.value,
      provider: providerInput.value,
      model: modelInput.value,
      photo_url: photoURLInput.value,
      description: descriptionInput.value,
    };
    try {
      if (mmlu) {
        const response = await updateMmlu(mmlu.id, payload);
        const data: Response = await response.json();
        toast(data.message);
      } else {
        const response = await createMmlu(payload);
        const data: Response = await response.json();
        toast(data.message);
      }
      getData();
      toggle();
    } catch (error) {}
  };

  return (
    <Suspense fallback={<Loading />}>
      <Toaster />

      <Modal show={open} onClose={toggle}>
        <Modal.Header>Mmlu</Modal.Header>
        <Modal.Body>
          <form className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label value="Name" />
              </div>
              <Input
                type="text"
                autoComplete="off"
                required
                value={nameInput.value}
                onChange={nameInput.handleChange}
              />
            </div>
            <div className="flex w-full gap-4">
              <div className="w-[200px]">
                <div className="mb-2 block">
                  <Label value="Provider" />
                </div>
                <Select
                  className="rounded-none"
                  value={providerInput.value}
                  onChange={providerInput.handleChange}
                >
                  <option value="ollama">Ollama</option>
                </Select>
              </div>

              <div className="flex-1">
                <div className="mb-2 block">
                  <Label value="Model" />
                </div>
                <Input
                  type="text"
                  autoComplete="off"
                  required
                  value={modelInput.value}
                  onChange={modelInput.handleChange}
                  list="models"
                />
                <datalist id="models">
                  {models
                    .filter((model) => providerInput.value === model.provider)
                    .map((model) => (
                      <option key={model.code} value={model.code} />
                    ))}
                </datalist>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="PhotoURL" />
              </div>
              <Input
                type="url"
                autoComplete="off"
                required
                value={photoURLInput.value}
                onChange={photoURLInput.handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Description" />
              </div>
              <TextArea
                rows={5}
                autoComplete="off"
                required
                value={descriptionInput.value}
                onChange={descriptionInput.handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="rounded-none w-[100px]" onClick={handleSave}>
            Save
          </Button>
          <Button
            className="rounded-none w-[100px]"
            color="gray"
            onClick={toggle}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <main className="flex">
        <AppLayout connections={null}>
          <div className="flex flex-1 flex-col gap-2">
            <section className="bg-gray-50 p-3 sm:p-5 flex flex-1">
              <div className="mx-auto max-w-screen-xl px-4 lg:px-12 flex flex-1">
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
                      <Button
                        type="button"
                        className="rounded-none w-[150px]"
                        onClick={handleAdd}
                      >
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
                          <th scope="col" className="px-4 py-3 w-[300px]">
                            Model
                          </th>
                          <th scope="col" className="px-4 py-3 w-[300px]">
                            Created At
                          </th>
                          <th scope="col" className="px-4 py-3  w-[60px]">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mmlus.map((mmlu) => (
                          <tr key={mmlu.id} className="flex">
                            <td className="px-4 py-1 flex-1">{mmlu.name}</td>
                            <td className="px-4 py-1 w-[300px]">
                              {mmlu.model}
                            </td>
                            <td className="px-4 py-1 w-[300px]">
                              {mmlu.creation_at}
                            </td>

                            <td className="px-4 py-1 w-[60px] flex flex-row justify-end gap-2">
                              <span
                                className="text-primary-500 cursor-pointer text-xl"
                                onClick={() => handleEdit(mmlu)}
                              >
                                <FaEdit />
                              </span>
                              <span className="text-red-700 cursor-pointer text-xl">
                                <RiDeleteBin2Fill />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
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
