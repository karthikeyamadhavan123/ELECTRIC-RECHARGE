import { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Firebase configuration file
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore methods

const CreateEVBunk = () => {
  const [bunkName, setBunkName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isOccupied, setIsOccupied] = useState(false);
  const [slots, setSlots] = useState([]); // Array to hold multiple slots
  const [bunks, setBunks] = useState([]); // Array to store created bunks

  // Load bunks from Firebase and localStorage on component mount
  useEffect(() => {
    const fetchBunks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "evBunks"));
        const bunkList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBunks(bunkList);
      } catch (error) {
        console.error("Error fetching bunks from Firebase: ", error);
        // Fallback to localStorage if Firebase fails
        const savedBunks = JSON.parse(localStorage.getItem("bunks")) || [];
        setBunks(savedBunks);
      }
    };

    fetchBunks();
  }, []);

  // Function to add a new slot
  const addSlot = () => {
    setSlots([...slots, { slotName: "", time: "" }]);
  };

  // Function to handle changes in slot input
  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  // Function to remove a slot
  const removeSlot = (index) => {
    const newSlots = slots.filter((_, i) => i !== index);
    setSlots(newSlots);
  };

  const handleCreateBunk = async () => {
    const newBunk = {
      bunkName,
      address,
      phone,
      location,
      isOccupied,
      slots,
    };

    // Save the new bunk to Firebase
    try {
      await addDoc(collection(db, "evBunks"), newBunk);
      alert("EV Bunk Created in Firebase");
    } catch (error) {
      console.error("Error saving bunk to Firebase: ", error);
    }

    // Save the new bunk to local state and localStorage
    const updatedBunks = [...bunks, newBunk];
    setBunks(updatedBunks);
    localStorage.setItem("bunks", JSON.stringify(updatedBunks));

    alert("EV Bunk Created and Saved");

    // Clear the form fields
    setBunkName("");
    setAddress("");
    setPhone("");
    setLocation("");
    setIsOccupied(false);
    setSlots([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create EV Bunk</h2>
      
      <input
        type="text"
        placeholder="Bunk Name"
        value={bunkName}
        onChange={(e) => setBunkName(e.target.value)}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="text"
        placeholder="Google Map Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={isOccupied}
          onChange={(e) => setIsOccupied(e.target.checked)}
          className="mr-2"
        />
        Occupied
      </label>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Slots:</h3>
        {slots.map((slot, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <input
              type="text"
              placeholder={`Slot Name`}
              value={slot.slotName}
              onChange={(e) => handleSlotChange(index, "slotName", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder={`Time`}
              value={slot.time}
              onChange={(e) => handleSlotChange(index, "time", e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={() => removeSlot(index)}
              className="text-red-500 text-sm underline"
            >
              Remove Slot
            </button>
          </div>
        ))}

        <button
          onClick={addSlot}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Add Slot
        </button>
      </div>
      
      <button
        onClick={handleCreateBunk}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Create Bunk
      </button>

      <h3 className="mt-6 text-lg font-semibold">Created EV Bunks:</h3>
      <ul>
        {bunks.map((bunk, index) => (
          <li key={index} className="mt-2 p-2 border rounded">
            <strong>{bunk.bunkName}</strong> - {bunk.address}, {bunk.phone}
            <br />
            <em>{bunk.isOccupied ? "Occupied" : "Available"}</em>
            <ul className="mt-2">
              {bunk.slots.map((slot, idx) => (
                <li key={idx} className="ml-4 list-disc">
                  <strong>{slot.slotName}</strong> - {slot.time}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateEVBunk;
