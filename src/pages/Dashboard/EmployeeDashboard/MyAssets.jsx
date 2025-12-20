import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { data: assets = [], refetch, isLoading } = useQuery({
    queryKey: ["my-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assigned-assets");
      return res.data;
    },
  });

  const handleReturn = async (id) => {
    const confirm = await Swal.fire({
      title: "Return asset?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Return",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/assigned-assets/return/${id}`);
    Swal.fire("Returned", "Asset returned successfully", "success");
    refetch();
  };

  const filteredAssets = assets.filter((a) => {
    const matchName = a.assetName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType = filter ? a.assetType === filter : true;

    return matchName && matchType;
  });

  if (isLoading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow">
      <h2 className="text-4xl font-bold text-center mb-3">My Assets</h2>
      <p className="text-center text-gray-600 mb-10">View, manage, and track all assets assigned to you across different companies.
      </p>


      <div className="mb-6">
      <div className="hidden md:flex items-center gap-4">

      <div className="relative flex-1 max-w-md">
      <input
        className="input border-2 border-primary w-full pl-5"
        placeholder="Search asset......"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

  
    <select
      className="select select-bordered border-2 border-primary w-44"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="">Filter</option>
      <option value="Returnable">Returnable</option>
      <option value="Non-returnable">Non-returnable</option>
    </select>

    {/* Print */}
    <button
      onClick={() => window.print()}
      className="btn  btn-primary btn-sm ml-auto transition-transform duration-200 hover:scale-105"
    >
      🖨 Print
    </button>
      </div>

    <div className="md:hidden space-y-3">
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
      <input
        className="input input-bordered w-full pl-9"
        placeholder="Search asset......"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="flex justify-between gap-3">
      <select
        className="select select-bordered "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Filter</option>
        <option value="Returnable">Returnable</option>
        <option value="Non-returnable">Non-returnable</option>
      </select>

      <button
        onClick={() => window.print()}
        className="btn btn-outline btn-sm px-3"
      >
        Print
      </button>
    </div>
  </div>
  </div>


      {filteredAssets.length === 0 ? (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center text-gray-600">
      <p className="text-xl font-semibold">No assets assigned yet</p>
      <p className="text-sm mt-1"> Once HR approves your request, assets will appear here
      </p>
      </div>

      ) : (
        <div className="overflow-x-auto mt-14">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Company</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((a) => (
                <tr key={a._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={a.assetImage}
                      className="w-10 h-10 rounded"
                    />
                    {a.assetName}
                  </td>
                  <td>{a.companyName}</td>
                  <td>{a.assetType}</td>
                  <td>{new Date(a.requestDate).toLocaleDateString()}</td>
                  <td>{new Date(a.assignmentDate).toLocaleDateString()}</td>
                  <td>
                    <span className="badge badge-success">
                      {a.status}
                    </span>
                  </td>
                  <td>
                    {a.status === "assigned" &&
                      a.assetType === "Returnable" && (
                        <button
                          onClick={() => handleReturn(a._id)}
                          className="btn btn-sm btn-warning transition-transform duration-200 hover:scale-105"
                        >
                          Return
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
