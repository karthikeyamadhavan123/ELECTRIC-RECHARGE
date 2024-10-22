import { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Import Firebase config
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"; // To access URL parameters

const ManageSlots = () => {
  const { bunkId } = useParams(); // Retrieve bunkId from the URL
  const [slots, setSlots] = useState([]);
  const [slotCount, setSlotCount] = useState(1); // Initialize based on slots

  // Fetch the EV bunk and its slots from Firebase
  useEffect(() => {
    const fetchBunk = async () => {
      try {
        const docRef = doc(db, "evBunks", bunkId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bunkData = docSnap.data();
          setSlots(bunkData.slots || []); // Set slots from Firebase
          setSlotCount((bunkData.slots?.length || 0) + 1); // Update slot count
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching bunk: ", error);
      }
    };

    fetchBunk();
  }, [bunkId]);

  // Function to add a new slot
  const handleAddSlot = async () => {
    const newSlot = { slotNumber: slotCount, status: "Available" };
    const updatedSlots = [...slots, newSlot];

    try {
      const docRef = doc(db, "evBunks", bunkId);
      await updateDoc(docRef, { slots: updatedSlots }); // Update Firestore document
      setSlots(updatedSlots); // Update local state
      setSlotCount(slotCount + 1); // Increment the slot number
    } catch (error) {
      console.error("Error adding new slot: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Slots</h2>

      <button
        onClick={handleAddSlot}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-4"
      >
        Add Slot
      </button>

      <ul className="space-y-3">
        {slots.map((slot, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
          >
            <span>Slot {slot.slotNumber}</span>
            <span
              className={`px-2 py-1 text-sm rounded ${
                slot.status === "Available"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {slot.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSlots;
