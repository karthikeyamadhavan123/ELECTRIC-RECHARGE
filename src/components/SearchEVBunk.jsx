import { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Firebase config
import { collection, getDocs } from "firebase/firestore";

const SearchEVBunks = () => {
  const [bunks, setBunks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBunks, setFilteredBunks] = useState([]);

  // Load bunks from Firebase and localStorage
  useEffect(() => {
    const fetchBunks = async () => {
      // Try fetching from Firestore
      try {
        const querySnapshot = await getDocs(collection(db, "evBunks"));
        const bunkList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBunks(bunkList);
        setFilteredBunks(bunkList);
      } catch (error) {
        console.error("Error fetching from Firebase: ", error);

        // Fall back to localStorage if Firebase is unavailable
        const savedBunks = JSON.parse(localStorage.getItem("bunks")) || [];
        setBunks(savedBunks);
        setFilteredBunks(savedBunks);
      }
    };

    fetchBunks();
  }, []);

  const handleSearch = () => {
    const filtered = bunks.filter(
      (bunk) =>
        bunk.bunkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bunk.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBunks(filtered);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Search Nearby EV Bunks
      </h2>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search by Bunk Name or Address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      <ul className="space-y-4">
        {filteredBunks.length > 0 ? (
          filteredBunks.map((bunk, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
            >
              <div>
                <h3 className="text-lg font-semibold">{bunk.bunkName}</h3>
                <p className="text-sm text-gray-600">{bunk.address}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No EV Bunks Found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchEVBunks;
