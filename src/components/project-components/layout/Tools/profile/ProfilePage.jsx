import { useEffect, useState } from "react"
import { getProfile } from "../../../../../api/profile";
import  user  from "../../../../../assets/user.png"

export default function ProfilePage({ onClick }) {

  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("pharmaToken")

  useEffect(() => {
    const getData = async () => {
      try {
        setIsWaiting(true);
        const data = await getProfile();

        setProfile(data);
      } catch (error) {
        setError("An error occurred while loading the data");
      } finally {
        setIsWaiting(false);
      }
    };
    getData();
  }, []);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 h-[500px] w-[500px] relative">

        <button onClick={onClick} className="absolute top-2 right-[30px] text-gray-500 hover:text-red-500 text-xl font-bold">
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img
            src={user}
            className="w-[200px] h-[200px] rounded-full border-4 border-blue-500 shadow"
          />
        </div>

        <div className="space-y-2">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <div className="text-lg font-medium text-gray-800 dark:text-gray-100">{profile.name}</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="text-gray-700 dark:text-gray-100">{profile.email}</div>
          </div>
          <div>
            <label className="text-sm text-gray-500">role</label>
            <div className="text-gray-700 dark:text-gray-100">{profile.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}