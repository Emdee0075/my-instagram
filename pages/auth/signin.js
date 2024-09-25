
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowAlert(true);
      setAlertColor("green");
      router.push("/");
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setAlertColor("red");
    }
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-10">
          <img
            className="w-44 mb-8 mx-auto"
            src="https://links.papareact.com/ocw"
            alt="Instagram"
          />
          {/* Updated the text color for "My Instagram" to white */}
          <p className="text-sm italic text-gray-500 mb-8">My Instagram.</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-3 flex flex-col items-end">
            <a href="/auth/forgetpassword" className="text-blue-500 text-sm">
              Forgot password?
            </a>
          </div>

          {loading ? (
            <button
              disabled
              className="w-full bg-gray-300 text-white py-3 rounded-lg focus:outline-none"
            >
              Loading...
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg focus:outline-none hover:bg-blue-600 shadow-md"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          )}

          <p className="mt-6 text-gray-500">
            Don't have an account yet?{" "}
            <a href="/auth/signup" className="text-blue-500 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
      {showAlert && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg text-white ${
            alertColor === "green" ? "bg-green-500" : "bg-red-400"
          } shadow-lg`}
        >
          {alertColor === "green" ? "Login Successful!" : "Invalid credentials!"}
        </div>
      )}
    </>
  );
}

export default SignIn;