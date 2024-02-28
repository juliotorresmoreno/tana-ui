import { Button } from "flowbite-react";
import { Input } from "../Input";
import { TextArea } from "../Textarea";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profile";
import { Profile } from "@/types/models";
import { useInput } from "@/hooks/useInput";
import toast, { Toaster } from 'react-hot-toast';

const RenderError = (error: Error | null) =>
  error ? (
    <div
      className="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {error.message}
    </div>
  ) : null;

export function ProfileForm() {
  const name = useInput("");
  const lastName = useInput("");
  const business = useInput("");
  const positionName = useInput("");
  const url = useInput("");
  const description = useInput("");

  useEffect(() => {
    async function getData() {
      const response = await getProfile();
      const data: Profile = await response.json();
      name.setValue(data.name);
      lastName.setValue(data.last_name);
      business.setValue(data.business);
      positionName.setValue(data.position_name);
      url.setValue(data.url);
      description.setValue(data.description);
    }
    getData();
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    clearErrors();

    await updateProfile({
      name: name.value,
      last_name: lastName.value,
      business: business.value,
      position_name: positionName.value,
      url: url.value,
      description: description.value,
    }).then(async (response) => {
      const data = await response.json();
      toast(data.message);
    })
      .catch((errors) => {
        const cause = errors.cause ?? {};
        if (cause.name) name.setError(new Error(cause.name));
        if (cause.last_name) lastName.setError(new Error(cause.last_name));
        if (cause.business) business.setError(new Error(cause.business));
        if (cause.position_name)
          positionName.setError(new Error(cause.position_name));
        if (cause.url) url.setError(new Error(cause.url));
        if (cause.description) description.setError(new Error(cause.description));
      });
  };

  const clearErrors = () => {
    name.setError(null);
    lastName.setError(null);
    business.setError(null);
    positionName.setError(null);
    url.setError(null);
    description.setError(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 lg:px-12 flex flex-1">
      <div className="bg-white relative shadow-md overflow-hidden flex-1">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Profile</h2>
            <form onSubmit={handleSubmit}>

              <Toaster />

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    required
                    value={name.value}
                    onChange={name.handleChange}
                  />

                  {RenderError(name.error)}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Last name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    required
                    value={lastName.value}
                    onChange={lastName.handleChange}
                  />
                  {RenderError(lastName.error)}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Business
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={business.value}
                    onChange={business.handleChange}
                  />
                  {RenderError(business.error)}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Position name
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={positionName.value}
                    onChange={positionName.handleChange}
                  />
                  {RenderError(positionName.error)}
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Url
                  </label>
                  <Input
                    autoComplete="off"
                    type="text"
                    value={url.value}
                    onChange={url.handleChange}
                  />
                  {RenderError(url.error)}
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <TextArea
                    rows={6}
                    placeholder="Your description here"
                    value={description.value}
                    onChange={description.handleChange}
                  />
                  {RenderError(description.error)}
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
