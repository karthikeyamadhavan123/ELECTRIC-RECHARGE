import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert(`${role === "admin" ? "Admin" : "User"} Logged in`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email,
          role,
        });
        alert("Registered as " + role);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      {!isLogin && (
        <div className="mb-6">
          <div className="flex justify-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="form-radio h-4 w-4 text-blue-600"
              />{" "}
              <span className="ml-2">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="form-radio h-4 w-4 text-blue-600"
              />{" "}
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
