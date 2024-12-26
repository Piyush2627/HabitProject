import { useEffect, useState } from "react";

interface userType {
  __id: string;
  name: string;
  email: string;
  password: string;
}

function AdminLayout() {
  const [userData, setUserData] = useState<userType[]>([]);
  const [updateEmail, setUpdateEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error(error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChangeEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/59b99db4cfa9a34dcd7885b6/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: updateEmail }),
        },
      );
      if (response.ok) {
        alert("Email updated successfully");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Failed to update email:", error);
      alert("Failed to update email. Please try again later.");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="border border-black"
        placeholder="Change Email"
        onChange={(e) => setUpdateEmail(e.target.value)}
      />
      <button onClick={handleChangeEmail}>Change email</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && userData.length === 0 && <p>No users found.</p>}
      {userData.map((user) => (
        <div key={user.__id}>{user.email}</div>
      ))}
    </div>
  );
}

export default AdminLayout;
