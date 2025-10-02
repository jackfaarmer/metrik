import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Welcome {user?.username}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
