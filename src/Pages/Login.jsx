
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

   const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setType("error");
      setMessage("Email and password are required");
      return;
    }

    try {
      
      const res = await API.post("/users/login", { email, password });
      setType("success");
      setMessage(res.data.message);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      setType("error");
      setMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();


  //      const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const foundUser = users.find(
  //     (user) => user.email === email && user.password === password
  //   );

  //   if (foundUser) {
  //     localStorage.setItem("loggedUser", JSON.stringify(foundUser));
  //     navigate("/dashboard");
  //   } else {
  //     setType("error");
  //     setMessage("Invalid email or password");
  //   }
  // };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {message && (
          <p
            className={`mb-4 text-sm p-2 rounded ${
              type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-cyan-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;


