import { Button } from "flowbite-react";
import { Input } from "../Input";
import { TextArea } from "../Textarea";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profile";
import { Profile } from "@/types/models";

export function ProfileForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [business, setBusiness] = useState("");
  const [positionName, setPositionName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await updateProfile({
      name,
      last_name: lastName,
      business,
      position_name: positionName,
      url,
      description,
    });
  };

  useEffect(() => {
    async function getData() {
      const response = await getProfile();
      const data: Profile = await response.json();
      setName(data.name);
      setLastName(data.last_name);
      setBusiness(data.business);
      setPositionName(data.position_name);
      setUrl(data.url);
      setDescription(data.description);
    }
    getData();
  }, []);
  return (
    <div className="mx-auto max-w-2xl px-4 lg:px-12 flex flex-1">
      <div className="bg-white relative shadow-md overflow-hidden flex-1">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    required
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Last name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    required
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Business
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={business}
                    onChange={(evt) => setBusiness(evt.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Position name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={positionName}
                    onChange={(evt) => setPositionName(evt.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Url
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={url}
                    onChange={(evt) => setUrl(evt.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <TextArea
                    rows={6}
                    placeholder="Your description here"
                    value={description}
                    onChange={(evt) => setDescription(evt.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-[100px] rounded-none">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
