/*import React, { useState } from "react";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlEncoded = new URLSearchParams();
    urlEncoded.append("username", formData.username);
    urlEncoded.append("email", formData.email);
    urlEncoded.append("password", formData.password);

    try {
      const res = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncoded.toString(),
      });

      const text = await res.text();
      if (res.ok) {
        setMessage("✅ " + text);
      } else {
        setMessage("❌ " + text);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to register doctor");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}*/



/*import React, { useState } from "react";

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isUsernameValid = (username) => {
    // ❌ Reject if only numbers (e.g., "123456")
    // ✅ Allow letters, numbers, symbols but not only digits
    return !/^\d+$/.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isUsernameValid(formData.username)) {
      setMessage("❌ Username cannot contain only numbers");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("✅ " + result);
        setFormData({ username: "", password: "", email: "" });
      } else {
        setMessage("❌ " + result);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Doctor Registration</h2>
      {message && (
        <p
          className={`mb-4 text-sm text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            pattern=".*\D.*" // HTML level: require at least one non-digit
            title="Username cannot be only numbers"
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}*/

/*import React, { useState } from "react";

export default function DoctorRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameRegex = /^[A-Za-z]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");



    // Validate username
    if (!nameRegex.test(username)) {
      setMessage("❌ Username must contain only alphabets (no numbers).");
      return;
    }
   

    // Validate password strength
    if (!passwordRegex.test(password)) {
      setMessage(
        "❌ Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/doctor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          email,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("✅ Doctor registered successfully.");
        setUsername("");
        setPassword("");
        setEmail("");
      } else {
        setMessage("❌ " + result);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Doctor Registration</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username (alphabets only)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="At least 8 chars, 1 uppercase, 1 number, 1 symbol"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}*/

import React, { useState } from "react";

export default function DoctorRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const validateUsername = (username) => {
    // Reject only-numeric usernames
    const onlyNumbers = /^\d+$/;
    return !onlyNumbers.test(username);
  };

  const validatePassword = (password) => {
    // Weak: less than 6 characters or lacks letters/digits
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 6 && hasLetter && hasNumber;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowPopup(false);

    if (!validateUsername(username)) {
      setMessage("❌ Username cannot be numbers only.");
      return;
    }

    if (!validatePassword(password)) {
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          email,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("✅ Doctor registered successfully.");
        setUsername("");
        setPassword("");
        setEmail("");
      } else {
        setMessage("❌ " + result);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Doctor Registration</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username (not numbers-only)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-600 font-medium">{message}</p>
      )}

      {showPopup && (
        <div className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded shadow text-sm">
          ⚠️ Password must be at least 6 characters and include both letters and numbers.
        </div>
      )}
    </div>
  );
}

