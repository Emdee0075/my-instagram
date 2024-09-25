import Image from "next/image";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  Bars4Icon,
  PlusCircleIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Modal from "./Modal";
import SearchPanel from "./searchPanel";
import { Fragment, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../firebase";
import { collection, onSnapshot, getDocs, query } from "firebase/firestore";

export default function Header() {
  const auth = getAuth(app);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    if (searchQuery == "") {
      setSearchPanelOpen(false);
    } else {
      setSearchPanelOpen(true);
    }
  };

  const searchUsers = () => {
    const filteredUsers = users.filter((user) =>
      user.data().username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    if (searchQuery == "") {
      setSearchPanelOpen(false);
    } else {
      setSearchPanelOpen(true);
    }
    searchUsers();
  }, [searchQuery]);

  useEffect(() => {
    onSnapshot(query(collection(db, "users")), (snapshot) => {
      setUsers(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="shadow-sm bg-white border-b z-50 sticky top-0">
        <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
          {/*ig logo*/}
          <div
            onClick={() => router.push("/")}
            className="relative hidden lg:inline-grid w-24 cursor-pointer"
          >
            <Image
              src="/instagram_logo.png"
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>

          {/*search bar*/}
          <div className="max-w-xs">
            <div className="relative mt-1 p-3 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center  pointer-events-none">
                <MagnifyingGlassIcon className="h-3 w-3 sm:text-xs lg:h-5 lg:w-5  text-gray-500" />
              </div>

              <input
                className="bg-gray-50 block w-full  pl-7 text-xs
            border-gray-300 focus:ring-black focus:border-black rounded-md"
                type={"text"}
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/*right*/}
          <div className=" flex items-center justify-end space-x-4">
            <HomeIcon onClick={() => router.push("/")} className="navBtn" />

            <GlobeAltIcon
              className="navBtn"
              onClick={() => router.push("/explore")}
            />

            {user ? (
              <>
                <div className="relative">
                  <PaperAirplaneIcon className="navBtn -rotate-45" />
                  <div
                    className="absolute -top-1 -right-1 text-xs w-4 bg-red-600 rounded-full text-white 
  flex items-center justify-center
  "
                  >
                    3
                  </div>
                </div>

                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="navBtn"
                />
                <HeartIcon className="navBtn" />

                <img
                  onClick={() => router.push("/profile")}
                  src={user?.photoURL}
                  alt="profile pic"
                  className="md:h-10  md:w-10  h-6 w-6 rounded-full hover:cursor-pointer object-cover"
                />
              </>
            ) : (
              <button onClick={() => router.push("/auth/signin")}>
                Sign in
              </button>
            )}
          </div>
          <SearchPanel
            isVisible={searchPanelOpen}
            onClose={() => setSearchPanelOpen(false)}
            users={filteredUsers}
          />
          <Modal isvisible={open} onClose={() => setOpen(false)} user={user} />
        </div>
      </div>
    </>
  );
}
