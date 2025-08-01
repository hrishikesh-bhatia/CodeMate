import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/${isLogin ? "login" : "signup"}`;
    try {
      const res = await axios.post(url, form);
      login(res.data.token, res.data.role);
      navigate("/");
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded text-white space-y-4 w-80">
        <h2 className="text-xl font-bold">{isLogin ? "Login" : "Signup"}</h2>
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {!isLogin && (
          <select
            className="w-full p-2 bg-gray-700"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="ta">TA</option>
          </select>
        )}
        <button type="submit" className="bg-blue-600 w-full py-2 rounded">
          {isLogin ? "Login" : "Signup"}
        </button>
        <p className="text-sm">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
