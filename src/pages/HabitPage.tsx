import { useEffect, useState } from "react";
import Calender from "../components/common/Calender";

interface Habits {
  _id: string;
  name: string;
  frequency: string;
  completedDates: string[];
  createdAt: string;
  __v: number;
}

function HabitPage() {
  const [data, setData] = useState<Habits[]>([]);
  const [newHabit, setNewHabit] = useState<Partial<Habits>>({});
  const [isDeleteHabit, setIsDeleteHabit] = useState<string>("");

  const handleDeleteHabit = (habitId: string) => {
    setIsDeleteHabit(habitId);
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
    <div className="p-5">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-white">Habit Tracker</h1>
        <p className="font-semibold text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="mb-6 w-96">
        <input
          type="text"
          className="w-full rounded border border-zinc-700 bg-zinc-900 px-4 py-2 text-2xl"
          placeholder="Enter habit name"
          value={newHabit.name || ""}
          onChange={(e) => updateTaskProperty("name", e.target.value)}
        />
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
        <button
          className="mt-4 w-full rounded border bg-zinc-400 px-4 py-2 font-bold text-zinc-800"
          onClick={postHabit}
        >
          Add Habit
        </button>
      </div>
      {data.length > 0 ? (
        <ul className="list-disc pl-5">
          {data.map((habit) => (
            <li key={habit._id} className="mb-2 flex space-x-4">
              <span className="font-semibold">{habit.name}</span>
              <span>
                {habit.frequency ? habit.frequency : "Frequency Not found "}
              </span>
              <span className="rounded bg-blue-200 px-2 font-semibold">
                {habit.completedDates.length}
              </span>
              <button
                className="text-red-500"
                onClick={() => handleDeleteHabit(habit._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No habits found. Start by adding one!</p>
      )}
      <Calender />
    </div>
  );
}

export default HabitPage;
