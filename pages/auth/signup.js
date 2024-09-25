
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import Header from "../../components/Header";
import "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const addUser = async (newUser) => {
    try {
      await addDoc(collection(db, "users"), {
        email: newUser.email,
        id: newUser.uid,
        username: newUser.displayName,
        profileImg: newUser.photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (!email || !password || !username) {
        setError("All fields are required");
        return;
      }

      const newUserCred = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = newUserCred.user;

      await updateProfile(newUser, {
        displayName: username,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/instagram-2-5d577.appspot.com/o/user_images%2FOIP%20(1).jpg?alt=media&token=2254d8cf-cf23-4255-8e25-eae5cbb8632c",
      }).then(() => {
        sessionStorage.setItem("Auth Token", newUserCred._tokenResponse.refreshToken);
        addUser(newUser);
        router.push("/");
      });
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    return onSnapshot(collection(db, "users"), (snapshot) => setUser(snapshot.docs));
  }, [db]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loading ? (
            <button
              disabled
              className="w-full bg-gray-300 text-white py-3 rounded-lg focus:outline-none shadow-md"
            >
              Loading...
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600 shadow-md"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          )}

          <p className="mt-6 text-gray-500">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-500 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
