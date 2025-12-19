import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const COLORS = ["#22c55e", "#f97316"];

const HRProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["hrProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: assetStats = [] } = useQuery({
    queryKey: ["assetStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/pie-charts");
      return res.data;
    },
  });

  const { data: topAssets = [] } = useQuery({
    queryKey: ["topAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/bar-charts");
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm({
    values: {
      name: profile.name,
      dateOfBirth: profile.dateOfBirth?.slice(0, 10),
      companyName: profile.companyName || "",
      companyLogo: profile.companyLogo || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, data);
      Swal.fire("Updated", "Profile updated successfully", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-base-100 px-8 py-4 rounded-xl shadow flex items-center gap-7">
        <img
          src={profile.companyLogo}
          alt=""
          className="w-36 h-24 rounded-xl object-contain border border-primary"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.companyName}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <span className="badge badge-primary mt-2">HR Manager</span>
        </div>
      </div>

      {/* info */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="space-y-4">
            <input
              {...register("name")}
              className="input input-bordered w-full"
              placeholder="Full Name"
            />

            <input
              type="date"
              {...register("dateOfBirth")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="space-y-4">
            <input
              {...register("companyName")}
              className="input input-bordered w-full"
              placeholder="Company Name"
            />

            <input
              {...register("companyLogo")}
              className="input input-bordered w-full"
              placeholder="Company Logo URL"
            />
          </div>

          <div className="space-y-4">
            <input
              value={profile.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              placeholder="Email"
            />

            <button
              type="submit"
              className="btn btn-primary w-full hover:scale-105 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* charts*/}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">
            Returnable vs Non-Returnable
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={assetStats}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
              >
                {assetStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />

              <Legend
                layout="vertical"
                align="right"
                verticalAlign="top"
                iconType="square"
                formatter={(value, entry) =>
                  `${value} (${entry.payload.value})`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-4">Top Requested Assets</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topAssets}>
              <XAxis dataKey="assetName" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="requests" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
