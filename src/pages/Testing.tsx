import { create } from "zustand";

type PersonState = {
  firstName: string;
  lastName: string;
  id: number;
  updateFirstName: (firstName: string) => void;
  updateLastName: (lastName: string) => void;
  updateId: (id: number) => void;
};

const usePersonStore = create<PersonState>((set) => ({
  firstName: "",
  lastName: "",
  id: 0,
  updateFirstName: (firstName) => set({ firstName }),
  updateLastName: (lastName) => set({ lastName }),
  updateId: (id) => set({ id }),
}));

function Testing() {
  const { firstName, updateFirstName } = usePersonStore();

  return (
    <main>
      <label>
        First name:
        <input
          onChange={(e) => updateFirstName(e.target.value)}
          value={firstName}
          placeholder="Enter your first name"
        />
      </label>
      <p>
        Hello, <strong>{firstName || "Guest"}!</strong>
      </p>
    </main>
  );
}

export default Testing;
