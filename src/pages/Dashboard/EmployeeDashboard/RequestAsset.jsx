import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 🔹 sorting state
  const [sortBy, setSortBy] = useState("dateAdded");
  const [order, setOrder] = useState("desc");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["available-assets", sortBy, order],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/available-assets?sortBy=${sortBy}&order=${order}`
      );
      return res.data;
    },
  });

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const note = e.target.note.value;

    try {
      await axiosSecure.post("/requests", {
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetType: selectedAsset.productType,
        hrEmail: selectedAsset.hrEmail,
        companyName: selectedAsset.companyName,
        note,
      });

      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your asset request is pending approval",
        timer: 1500,
        showConfirmButton: false,
      });

      setSelectedAsset(null);
      refetch();
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to submit request", "error");
    }
  };

  /* 🔹 SKELETON CARD */
  const SkeletonCard = () => (
    <div className="rounded-2xl bg-white border border-base-200 shadow-sm animate-pulse flex flex-col overflow-hidden">
      <div className="h-44 bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>
        <div className="h-9 bg-gray-300 rounded mt-4" />
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold">Request an Asset</h2>
        <p className="text-gray-600 mt-2">
          Browse available company assets and submit a request
        </p>
      </div>

      {/* 🔹 SORTING CONTROL (CENTERED) */}
      <div className="flex justify-center mb-6">
        <select
          className="select select-bordered"
          value={`${sortBy}-${order}`}
          onChange={(e) => {
            const [field, direction] = e.target.value.split("-");
            setSortBy(field);
            setOrder(direction);
          }}
        >
          <option value="dateAdded-desc">Latest</option>
          <option value="productName-asc">Name (A-Z)</option>
          <option value="availableQuantity-desc">
            Quantity (High → Low)
          </option>
        </select>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!isLoading && assets.length === 0 && (
          <div className="col-span-full h-60 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-medium">No assets available</p>
            <p className="text-sm">
              Please check back later or contact HR
            </p>
          </div>
        )}

        {!isLoading &&
          assets.map((asset) => (
            <div
              key={asset._id}
              className="group rounded-2xl bg-white border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              <div className="h-44 bg-base-200 overflow-hidden">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {asset.productName}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {asset.companyName}
                </p>

                <div className="flex items-center justify-between text-sm my-2">
                  <span
                    className={`badge badge-soft ${
                      asset.productType === "Returnable"
                        ? "badge-primary"
                        : "badge-warning"
                    }`}
                  >
                    {asset.productType}
                  </span>

                  <span className="font-semibold text-gray-700">
                    Available:{" "}
                    <span className="text-primary">
                      {asset.availableQuantity}
                    </span>
                  </span>
                </div>

                <div className="mt-auto pt-3">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="btn btn-primary rounded-lg w-full transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    Request Asset
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* modal */}
      {selectedAsset && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Request for {selectedAsset.productName}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Company: {selectedAsset.companyName}
            </p>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <textarea
                name="note"
                className="textarea textarea-bordered w-full"
                placeholder="Add a note for HR (optional)"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
