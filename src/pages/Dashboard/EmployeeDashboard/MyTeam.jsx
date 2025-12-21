import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBirthdayCake, FaUsers } from "react-icons/fa";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["my-team"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee/my-team");
      return res.data;
    },
  });

  const { companies = [], team = [], birthdays = [] } = data;

  if (isLoading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="space-y-8 px-10 mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold flex items-center justify-center gap-2">
          <FaUsers /> My Team
        </h2>
        <p className="text-gray-600 mt-2">
          Colleagues from your affiliated companies
        </p>
      </div>


      <div className="flex justify-center">
        <select className="select select-bordered max-w-sm border-2 border-primary">
          {companies.map((c) => (
            <option key={c._id}>{c.companyName}</option>
          ))}
        </select>
      </div>

      {/* team cards */}
      {team.length === 0 ? (
        <div className="h-72 flex flex-col items-center justify-center text-gray-500">
          <p className="text-lg font-medium">No team members found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member._id}
              className="bg-base-100 rounded-xl shadow hover:shadow-lg transition p-6 flex items-center gap-5"
            >
              <img
                src={
                  member.profileImage ||
                  "https://i.ibb.co/0Jmshvb/avatar.png"
                }
                alt=""
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className=" text-gray-600">{member.email}</p>
                <span className="badge badge-outline badge-primary mt-2 font-semibold">
                  {member.role === "hr" ? "HR Manager" : "Employee"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* birthdays */}
      <div className="bg-base-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaBirthdayCake className="text-pink-500" />
          Upcoming Birthdays
        </h3>

        {birthdays.length === 0 ? (
          <p className="text-gray-500">
            No birthdays this month 🎉
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birthdays.map((b) => (
              <div
                key={b._id}
                className="border rounded-lg p-4 flex items-center gap-5 bg-blue-100"
              >
                <img
                  src={
                    b.profileImage ||
                    "https://i.ibb.co/0Jmshvb/avatar.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-bold">{b.name}</p>
                  <p className="text-sm text-gray-600 font-medium">
                    🎂 {new Date(b.dateOfBirth).toDateString()}
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

export default MyTeam;
