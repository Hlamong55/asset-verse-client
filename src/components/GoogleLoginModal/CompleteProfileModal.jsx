import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CompleteProfileModal = ({ user, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    companyName: "",
    companyLogo: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      return Swal.fire("Select Role", "Please choose a role", "warning");
    }

    if (!formData.dob) {
      return Swal.fire("Missing Info", "Date of birth is required", "warning");
    }

    if (role === "hr" && (!formData.companyName || !formData.companyLogo)) {
      return Swal.fire(
        "Missing Info",
        "Company name & logo are required",
        "warning"
      );
    }

    try {
      setLoading(true);

      const payload = {
        email: user.email,
        role,
        name: formData.name,
        dob: formData.dob,
        companyName: role === "hr" ? formData.companyName : null,
        companyLogo: role === "hr" ? formData.companyLogo : null,
        profileComplete: true,
      };

      const res = await axiosSecure.put("/users/complete-profile", payload);

      setUser(res.data); // update auth state

      Swal.fire({
        icon: "success",
        title: "Profile Completed 🎉",
        timer: 1200,
        showConfirmButton: false,
      });

      onClose();

      setTimeout(() => {
        navigate(
          role === "hr"
            ? "/dashboard/hr/asset-list"
            : "/dashboard/employee/assets"
        );
      }, 1200);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to complete profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-2xl mb-1">
          Complete Your Profile
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Just one more step to continue
        </p>

        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={user.photoURL}
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* ROLE SELECT */}
        <div className="mb-4">
          <label className="label font-semibold">Select Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="employee"
                className="radio radio-primary"
                onChange={() => setRole("employee")}
              />
              Employee
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="hr"
                className="radio radio-primary"
                onChange={() => setRole("hr")}
              />
              HR Manager
            </label>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="input input-bordered w-full bg-base-200"
          />

          {role === "hr" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input input-bordered w-full"
                onChange={handleChange}
              />

              <input
                type="url"
                name="companyLogo"
                placeholder="Company Logo URL"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="date"
            name="dob"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2 hover:scale-105 transition"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default CompleteProfileModal;
