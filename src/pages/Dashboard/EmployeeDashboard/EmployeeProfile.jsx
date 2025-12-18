import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

const EmployeeProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: affiliations = [] } = useQuery({
    queryKey: ["affiliations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-affiliations/${user.email}`
      );
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm({
    values: {
      name: profile.name,
      dateOfBirth: profile.dateOfBirth?.slice(0, 10),
    },
  });


  const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.data.display_url;
};

const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const imageUrl = await uploadImageToImgBB(file);

    await axiosSecure.patch(`/users/${user.email}`, {
      profileImage: imageUrl,
    });

    Swal.fire("Updated", "Profile photo updated", "success");
    refetch();
  } catch {
    Swal.fire("Error", "Photo upload failed", "error");
  }
};



  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, data);
      Swal.fire("Updated", "Profile updated successfully", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-base-100 rounded-2xl p-6 shadow-md flex items-center gap-10">
        <div className="relative">
          <img
            src={
              profile.profileImage ||
              "https://i.ibb.co.com/W4rvDRZd/istockphoto-1033886776-612x612.jpg"
            }
            alt="Upload Your Photo"
            className="w-28 h-28 rounded-full object-cover border border-green-600"
          />
        <label className="absolute -bottom-1.5 -right-1 bg-primary text-white text-xs px-2 py-1 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-green-600">
            Change
            <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
            />
        </label>

        </div>

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUser /> {profile.name}
          </h2>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <FaEnvelope /> {profile.email}
          </p>
          <span className="badge badge-outline badge-primary mt-3">
            {profile.role === "hr" ? "HR Manager" : "Employee"}
          </span>
        </div>
      </div>

      {/* details */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaIdBadge /> Personal Information
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-3"
        >
          <div>
            <label className="label-text">Full Name</label>
            <input
              {...register("name")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label-text">Email</label>
            <input
              value={profile.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label-text">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-end">
            <button className="btn btn-primary w-full transition-transform duration-300 hover:scale-105">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* company */}
      <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaBuilding /> Company Affiliations
        </h3>

        {affiliations.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            <p className="text-lg font-medium">
              No company affiliation yet
            </p>
            <p className="text-sm">
              Request an asset to get affiliated with a company
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {affiliations.map((a) => (
              <div
                key={a._id}
                className="border rounded-xl p-4 flex gap-4 items-center"
              >
                <img
                  src={a.companyLogo}
                  alt=""
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-semibold">
                    {a.companyName}
                  </h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaCalendarAlt />
                    Joined {new Date(a.affiliationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
