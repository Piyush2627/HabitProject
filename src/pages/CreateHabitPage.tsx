import { TbSearch } from "react-icons/tb";
import { TbFilterEdit } from "react-icons/tb";
import { MdOutlineAddRoad } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HabitType } from "../types/Types";
import { useState } from "react";

const dates = new Date();

function CreateHabitPage() {
  const queryClient = useQueryClient();
  const [habitInput, setHabitInput] = useState<HabitType>({
    title: "",
    frequency: 0,
    duration: 2,
    description: "",
    completed: 0,
    completedDates: [
      {
        dates: new Date(),
        isSkipped: false,
        status: false,
      },
    ],
  });

  const [completedDates, setCompletedDates] = useState<any>({
    dates: new Date(),
    isSkipped: false,
    status: false,
  });

  const {
    data: habitData,
    isError: fetchError,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/apiH1/getHabits");
      if (!response.ok) {
        throw new Error("Failed to fetch habits.");
      }
      const data = await response.json();
      return data;
    },
    queryKey: ["habitQueryKey"],
  });

  const { mutateAsync: addHabit } = useMutation({
    mutationFn: async (habit: HabitType) => {
      const response = await fetch("http://localhost:3000/apiH1/habit/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habit),
      });
      if (!response.ok) {
        throw new Error("Failed to create habit.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitQueryKey"] });
      console.log("Habit added successfully");
      setHabitInput({
        title: "",
        frequency: 0,
        duration: 2,
        description: "",
        completed: 0,
        completedDates: [
          {
            dates: new Date(),
            isSkipped: false,
            status: false,
          },
        ],
      });
    },
  });

  const { mutateAsync: removeHabit } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `http://localhost:3000/apiH1/habit/delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete habit.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitQueryKey"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setHabitInput((prevForm) => ({
      ...prevForm,
      [name]: name === "frequency" ? parseInt(value) : value,
    }));
  };

  return (
    <div>
      <div className="h-screen p-5">
        <div className="text-2xl font-semibold capitalize text-white">
          Create a new task
        </div>
        <div className="mt-3 flex space-x-4 rounded border border-zinc-500 p-2 text-white">
          <div className="flex items-center justify-around space-x-2 rounded bg-zinc-700 p-2 text-lg">
            <div>
              <TbSearch />
            </div>
            <div>Search</div>
          </div>
          <div className="flex items-center justify-around space-x-2 rounded bg-zinc-700 p-2 text-lg">
            <div>
              <TbFilterEdit />
            </div>
            <div>Filter</div>
          </div>
        </div>

        <div className="mt-2 flex space-x-4">
          <input
            type="text"
            name="title"
            className="rounded bg-zinc-600 p-2 text-white"
            placeholder="Enter task title"
            value={habitInput.title}
            onChange={handleInputChange}
          />
          <select
            name="frequency"
            className="rounded bg-zinc-600 p-2 text-white"
            value={habitInput.frequency}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Frequency
            </option>
            <option value="1">Daily</option>
            <option value="7">Weekly</option>
            <option value="30">Monthly</option>
          </select>
          <button
            className="flex items-center justify-around space-x-2 rounded bg-blue-500 px-2 text-lg text-white"
            onClick={() => addHabit(habitInput)}
          >
            <div>
              <MdOutlineAddRoad />
            </div>
            <div>Create</div>
          </button>
        </div>

        {fetchError && (
          <div className="mt-3 text-red-500">Error fetching habits.</div>
        )}

        {isLoading ? (
          <div className="mt-3 text-white">Loading...</div>
        ) : (
          <div className="mt-3 text-white">
            {habitData?.map((habit: HabitType) => (
              <div
                key={habit._id}
                className="mb-2 flex items-center justify-between rounded border p-3"
              >
                <div className="flex items-center space-x-2">
                  <div>{habit.title}</div>
                  <div>
                    {habit.frequency == 0 ? (
                      <div className="rounded bg-slate-600 p-2">Daily</div>
                    ) : habit.frequency == 30 ? (
                      <div className="rounded bg-slate-600 p-2">Monthly</div>
                    ) : (
                      <div className="rounded bg-slate-600 p-2">Weekly</div>
                    )}
                  </div>
                  <div>{}</div>
                </div>

                <div>
                  {" "}
                  <button
                    className="rounded bg-blue-500 p-3"
                    onClick={() => habit._id && removeHabit(habit._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateHabitPage;
