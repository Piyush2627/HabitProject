import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { UserType } from "../types/Types";
import { useEffect, useState } from "react";

function SignUpPage() {
  const [isInputValues, setInputValues] = useState<UserType | undefined>();

  const useQueryClient = new QueryClient();

  const { data: Users } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/apiUser/allUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch habits.");
      }
      const data = await response.json();
      return data;
    },
    queryKey: ["Users"],
  });

  const { mutateAsync: RegisterUsers } = useMutation({
    mutationFn: async (isInputValues: UserType | undefined) => {
      const response = await fetch("http://localhost:3000/apiUser/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isInputValues),
      });
      if (!response.ok) {
        throw new Error("Failed to create.");
      }
      return response.json();
    },
    onSuccess: () => {
      useQueryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputValues((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(isInputValues);
  }, [isInputValues]);

  return (
    <>
      <div className="flex min-h-screen justify-center bg-zinc-900">
        <div className="m-0 flex flex-1 justify-center">
          <div className="p-6 lg:w-1/2 xl:w-5/12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl font-extrabold text-white xl:text-3xl">
                Sign Up
              </h1>
              <div className="mt-8 w-full flex-1">
                <div className="mx-auto max-w-xs">
                  <input
                    name="username"
                    className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                    type="text"
                    placeholder="User Name"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => handleInputChange(e)}
                  />{" "}
                  <input
                    className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                    type="password"
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Password"
                  />
                  <input
                    className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <Link to={"/home"}>
                    <button
                      onClick={() => RegisterUsers(isInputValues)}
                      className="focus:shadow-outline mt-5 flex w-full items-center justify-center rounded-lg bg-indigo-500 py-4 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none"
                    >
                      <svg
                        className="-ml-2 h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                  </Link>
                  <p className="mt-6 text-center text-xs text-gray-600">
                    I agree to abide by template's
                    <a
                      href="#"
                      className="border-b border-dotted border-gray-500"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-dotted border-gray-500"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden flex-1 bg-zinc-800 text-center lg:flex">
            <div
              className="m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16"
              style={{
                backgroundImage: `url(${"https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
