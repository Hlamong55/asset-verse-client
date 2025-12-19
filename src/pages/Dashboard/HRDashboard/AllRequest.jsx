import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ["all-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Request?",
      text: "Asset will be assigned to employee",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/requests/approve/${id}`);
      Swal.fire("Approved", "Request approved successfully", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Approve failed", "error");
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/requests/reject/${id}`);
      Swal.fire("Rejected", "Request rejected", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Reject failed", "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-center">All Requests</h2>
      <p className="text-center text-gray-500 mt-2">
        Manage employee asset requests
      </p>

      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>
                  <div className=" text-base font-semibold">{req.requesterName}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {req.requesterEmail}
                  </div>
                </td>

                <td className=" text-base font-semibold">{req.assetName}</td>

                <td className=" text-base font-semibold">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>

                <td>
                  <span
                    className={`badge ${
                    req.requestStatus === "approved"
                    ? "badge-success"
                    : req.requestStatus === "rejected"
                    ? "badge-error"
                    : "badge-warning"
                  }`}
                  >
                    {req.requestStatus}
                  </span>

                </td>

                <td className="text-center space-x-2">
                  {req.requestStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="btn btn-sm btn-outline text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Action completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequest;
