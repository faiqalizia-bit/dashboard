import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      setType("error");
      setMessage("All fields are required");
      return;
    }

    if (password.length < 6) {
      setType("error");
      setMessage("Password must be at least 6 characters");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(form));
    setType("success");
    setMessage("Registration successful");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

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
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-cyan-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already registered?{" "}
          <Link to="/" className="text-cyan-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;


// const Register = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center item-center bg-gray-100">
//       <form className="bg-white p-8 rounded-lg  w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-2 border rounded"
//         />
        
//         <button className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600">
//           Register
//         </button>

//       </form>
//     </div>
//   );
// };

// export default Register;
