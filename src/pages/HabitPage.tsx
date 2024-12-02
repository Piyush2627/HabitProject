import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
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
        <h1 className="mb-4 text-6xl font-bold leading-7">Habit Tracker</h1>
        <p className="font-semibold text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="mb-6">
        <div className="flex items-center rounded border p-2">
          <TbSearch className="size-8" />
          <input
            type="text"
            className="w-full px-4 py-2 text-2xl focus:border-0 focus:outline-none"
            placeholder="Enter habit name"
            value={newHabit.name || ""}
            onChange={(e) => updateTaskProperty("name", e.target.value)}
          />
        </div>
        <select
          className="w-full rounded border px-4 py-2"
          value={newHabit.frequency || ""}
          onChange={(e) => updateTaskProperty("frequency", e.target.value)}
        >
          <option value="" disabled>
            Select Frequency
          </option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <button
          className="mt-4 w-full rounded border bg-blue-400 px-4 py-2 text-white"
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
