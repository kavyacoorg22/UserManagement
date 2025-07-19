import { DEFAULT_IMG } from "../../../utils/constants";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser } from '../../../utils/userSlice';

const AdminPanal = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/user/all', {
          method: 'GET',
          credentials: 'include', 
        });

        const data = await res.json();

        if (res.ok) {
          dispatch(setUsers(data.users));
        } else {
          console.error("Failed to fetch users:", data.message || 'Unknown error');
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleBlockToggle = async (userId) => {
    try {
      const res = await fetch(`/user/block/${userId}`, {
        method: "PUT",
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        const updatedUsers = users.map((u) =>
          u._id === userId ? data.user : u
        );
        dispatch(setUsers(updatedUsers));
      } else {
        alert(data.message || "Error updating user status");
      }
    } catch (err) {
      console.error(err);
      alert("Error blocking user");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`/user/${userId}`, {
        method: "DELETE",
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "User deleted");
        dispatch(deleteUser(userId));
      } else {
        alert(data.message || "Error deleting user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  if (!Array.isArray(users)) {
    return <p className="text-center text-red-500">Invalid user data</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 mx-28">
      {users.map((user) => (
        <div key={user._id} className="bg-gray-600 p-4 w-full max-w-xs rounded-lg shadow-md text-center">
          <div className="relative group cursor-pointer mx-auto w-28 h-28 mb-3">
            <img
              src={user.image?.startsWith("http") ? user.image : `http://localhost:3032/${user.image}`}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow group-hover:opacity-80 transition duration-300"
              onError={(e) => { e.target.src = DEFAULT_IMG }}
            />
          </div>

          <h4 className="text-xl font-semibold text-white">{user.name}</h4>
          <h5 className="text-sm text-gray-200 mb-4">{user.email}</h5>

          <div className="flex justify-center gap-2">
            <button
              className={`px-4 py-2 mt-2 rounded ${user.isBlocked ? 'bg-green-500' : 'bg-red-600'} text-white`}
              onClick={() => handleBlockToggle(user._id)}
            >
              {user.isBlocked ? 'Unblock' : 'Block'}
            </button>

            <button
              className="px-4 py-2 mt-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanal;
