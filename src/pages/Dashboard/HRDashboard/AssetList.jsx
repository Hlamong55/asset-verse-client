import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditAsset from "./EditAsset";
import Swal from "sweetalert2";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;

  const [page, setPage] = useState(pageFromURL);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 🔹 states
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  /* ================= 🔥 FIX START ================= */
  useEffect(() => {
    setPage(1);
    setSearchParams({
      page: 1,
      limit,
      ...(search && { search }),
      ...(filterType !== "all" && { type: filterType }),
    });
  }, [search, filterType, limit, setSearchParams]);
  /* ================= 🔥 FIX END ================= */

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assets", page, limit, search, filterType],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
      });

      if (search) params.append("search", search);
      if (filterType !== "all") params.append("type", filterType);

      const res = await axiosSecure.get(`/assets?${params.toString()}`);
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

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This asset will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (res.isConfirmed) {
      await axiosSecure.delete(`/assets/${id}`);
      Swal.fire("Deleted!", "Asset has been deleted.", "success");
      refetch();
    }
  };

  const SkeletonRow = () => (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i}>
          <div className="h-4 bg-base-300 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-8 bg-base-100 rounded-xl p-5 shadow-sm">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">
          Asset List
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-center">
          View and manage all company assets from a centralized inventory.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by asset name..."
          className="input input-bordered border-primary max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered border-primary max-w-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {!isLoading && assets.length === 0 && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold">No assets found</h3>
          <p className="text-gray-600 mt-2">
            Start managing your company assets by adding one.
          </p>
          <Link to="/dashboard/hr/add-asset" className="btn btn-primary mt-4">
            Add First Asset
          </Link>
        </div>
      )}

      {(isLoading || assets.length > 0) && (
        <>
          <div className="w-full overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra min-w-225">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th className="hidden md:table-cell">Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading
                  ? [...Array(limit)].map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : assets.map((asset) => (
                      <tr key={asset._id}>
                        <td>
                          <img
                            src={asset.productImage}
                            className="w-20 h-14 rounded object-cover"
                          />
                        </td>
                        <td className="text-base font-medium">
                          {asset.productName}
                        </td>
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
                        <td className="font-semibold">
                          {asset.productQuantity}
                        </td>
                        <td className="hidden sm:table-cell font-semibold">
                          {new Date(asset.dateAdded).toLocaleDateString()}
                        </td>
                        <td className="flex flex-col md:flex-row gap-2 justify-center">
                          <button
                            className="btn btn-sm btn-outline btn-success transition-transform duration-300 hover:scale-105"
                            onClick={() => setSelectedAsset(asset)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition-transform duration-300 hover:scale-105"
                            onClick={() => handleDelete(asset._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {!isLoading && (
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
          )}
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
