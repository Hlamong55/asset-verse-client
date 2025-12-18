import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: affiliations = [] } = useQuery({
    queryKey: ["my-affiliations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee-affiliations/${user.email}`
      );
      return res.data;
    },
  });

  const { data: team = [], isLoading } = useQuery({
    queryKey: ["my-team", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-team?companyName=${selectedCompany}`
      );
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold flex justify-center items-center gap-2">
          <FaUsers /> My Team
        </h2>
        <p className="text-gray-600 mt-1">
          View colleagues from your affiliated company
        </p>
      </div>

      {affiliations.length === 0 && (
        <div className="bg-base-100 rounded-xl mt-10 p-10 text-center shadow-sm">
          <p className="text-lg font-semibold">
            You are not affiliated with any company yet
          </p>
          <p className="text-gray-500 mt-1">
            Request an asset to join a company
          </p>
        </div>
      )}


      {affiliations.length > 0 && (
        <div className="max-w-sm mx-auto">
          <select
            className="select select-bordered w-full"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Select Company</option>
            {affiliations.map((a) => (
              <option key={a._id} value={a.companyName}>
                {a.companyName}
              </option>
            ))}
          </select>
        </div>
      )}


      {selectedCompany && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-base-200 rounded-xl animate-pulse"
                />
              ))
            : team.map((member) => (
                <div
                  key={member._id}
                  className="bg-base-100 p-5 rounded-xl shadow-sm flex items-center gap-4"
                >
                  <img
                    src={
                      member.profileImage ||
                      "https://i.ibb.co.com/W4rvDRZd/istockphoto-1033886776-612x612.jpg"
                    }
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-500">
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default MyTeam;
