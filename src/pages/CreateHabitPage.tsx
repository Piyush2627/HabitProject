import { useEffect, useState } from "react";
//icons
import { MdAdd } from "react-icons/md";

interface Habits {
  _id: string;
  name: string;
  frequency: string;
  completedDates: string[];
  createdAt: string;
  __v: number;
}

function CreateHabitPage() {
  const [data, setData] = useState<Habits[]>([]);
  const reverse = [...data].reverse();
  const [newHabit, setNewHabit] = useState<Partial<Habits>>({});
  const [isDeleteHabit, setIsDeleteHabit] = useState<string>("");
  const [ToggleCreateTask, setToggleCreateTask] = useState(false);

  const handleDeleteHabit = (habitId: string) => {
    setIsDeleteHabit(habitId);
  };

  const handleToggleCreateTask = () => {
    setToggleCreateTask((prev) => !prev);
  };

  useEffect(() => {
    if (!isDeleteHabit) return;
    const deleteHabit = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/${isDeleteHabit}`,
          {
            method: "DELETE",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setData((prevData) =>
          prevData.filter((habit) => habit._id !== isDeleteHabit),
        );
      } catch (error) {
        console.error("Error Fetching the data: ", error);
      }
    };
    deleteHabit();
  }, [isDeleteHabit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const habits: Habits[] = await response.json();
        setData(habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchData();
  }, []);

  const updateTaskProperty = (key: keyof Habits, value: string) => {
    setNewHabit((prev) => ({ ...prev, [key]: value }));
  };

  const postHabit = async () => {
    if (!newHabit.name || !newHabit.frequency) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newHabit.name,
          frequency: newHabit.frequency,
          completedDates: [],
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdHabit: Habits = await response.json();
      setData((prev) => [...prev, createdHabit]);
      setNewHabit({});
    } catch (error) {
      console.error("  posting habit:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Create A New Tracker
          </h1>
          <p className="font-semibold text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <button
          onClick={handleToggleCreateTask}
          className="flex items-center space-x-1 rounded border bg-white px-2 py-2 font-semibold"
        >
          {ToggleCreateTask ? (
            "X"
          ) : (
            <>
              <div>Create Habits </div>
              <MdAdd className="size-5" />
            </>
          )}
        </button>
      </div>
      {ToggleCreateTask && (
        <div className="mb-6">
          <input
            type="text"
            className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-2xl"
            placeholder="Enter habit name"
            value={newHabit.name || ""}
            onChange={(e) => updateTaskProperty("name", e.target.value)}
          />
          <div className="mt-2 text-white">Repeat Frequency</div>
          <select
            className="font-white mt-2 w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
            value={newHabit.frequency || ""}
            onChange={(e) => updateTaskProperty("frequency", e.target.value)}
          >
            <option value="" className="bg-zinc-800" disabled>
              Select Frequency
            </option>
            <option className="text-white" value="Daily">
              Daily
            </option>
            <option className="text-white" value="Weekly">
              Weekly
            </option>
            <option className="text-white" value="Monthly">
              Monthly
            </option>
          </select>
          <div className="mt-2 text-white">
            {" "}
            <div>Staring date</div>
            <input type="date" className="bg-zinc-900 text-white" />
          </div>
          <button
            className="mt-4 w-full rounded border bg-zinc-400 px-4 py-2 font-bold text-zinc-800"
            onClick={postHabit}
          >
            Add Habit
          </button>
        </div>
      )}

      <div className="text-lg font-bold text-white">
        Total created habits {data.length}
      </div>
      {data.length > 0 ? (
        <ul className="">
          {reverse.map((habit) => (
            <li
              key={habit._id}
              className="mb-2 flex justify-between rounded border p-4"
            >
              <div className="flex space-x-4">
                <span className="space-x-4 font-semibold text-white">
                  {habit.name}
                </span>
                <span className="text-white">
                  {habit.frequency ? habit.frequency : "Frequency Not found "}
                </span>
                <span className="rounded bg-blue-200 px-2 font-semibold">
                  {habit.completedDates.length} --
                  {habit.completedDates}
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteHabit(habit._id)}
                >
                  Delete
                </button>
                x<button className="text-white">Mark as done</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No habits found. Start by adding one!</p>
      )}
    </div>
  );
}

export default CreateHabitPage;
