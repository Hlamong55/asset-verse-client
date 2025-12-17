import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditAsset from "./EditAsset";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [page, setPage] = useState(pageFromURL);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assets", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const assets = data?.assets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const updatePage = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage, limit });
  };


  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-extrabold text-center">Asset List</h2>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-center">
      View and manage all company assets from a centralized inventory.
      </p>
      </div>

      {!isLoading && assets.length === 0 && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold">No assets found</h3>
          <p className="text-gray-600 mt-2">
            Start managing your company assets by adding one.
          </p>
          <Link
            to="/dashboard/hr/add-asset"
            className="btn btn-primary mt-4"
          >
            Add First Asset
          </Link>
        </div>
      )}

      {!isLoading && assets.length > 0 && (
        <>
          <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset._id}>
                    <td>
                      <img
                        src={asset.productImage}
                        className="w-20 h-14 rounded object-cover"
                      />
                    </td>
                    <td className="text-base font-medium">{asset.productName}</td>
                    <td>
                      <span
                        className={`badge ${
                          asset.productType === "Returnable"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {asset.productType}
                      </span>
                    </td>
                    <td className="font-semibold">{asset.productQuantity}</td>
                    <td className="font-semibold">
                      {new Date(asset.dateAdded).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedAsset(asset)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => updatePage(page - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => updatePage(num + 1)}
                className={`btn btn-sm ${
                  page === num + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => updatePage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedAsset && (
        <EditAsset
          asset={selectedAsset}
          closeModal={() => setSelectedAsset(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AssetList;
