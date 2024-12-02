import { HabitType } from "../types/Types";

export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5001/api");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const habits: HabitType[] = await response.json();
    return habits;
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};

export const postHabit = async (post: HabitType) => {
  const response = await fetch("http://localhost:5001/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};
