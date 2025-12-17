import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["my-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assigned-assets");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-sm">
      <h2 className="text-4xl font-extrabold text-center mb-2">My Assets</h2>
      <p className="text-center text-gray-600 mb-6">
        Assets assigned to you from different companies
      </p>

      {assets.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center text-gray-600">
      <p className="text-xl font-medium">No company affiliation yet</p>
      <p className="text-sm">
        Request an asset from a company to get affiliated
      </p>
    </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Company</th>
                <th>Type</th>
                <th>Assigned On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((item) => (
                <tr key={item._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={item.assetImage}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{item.assetName}</span>
                  </td>
                  <td>{item.companyName}</td>
                  <td>{item.assetType}</td>
                  <td>
                    {new Date(item.assignmentDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="badge badge-success">
                      {item.status}
                    </span>
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
