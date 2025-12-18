import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["available-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/available-assets");
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

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center text-gray-500">
        Loading assets...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold">Request an Asset</h2>
        <p className="text-gray-600 mt-2">
          Browse available company assets and submit a request
        </p>
      </div>

      {/* card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {assets.length === 0 && (
          <div className="col-span-full h-60 flex flex-col items-center justify-center text-gray-500">
            <p className="text-lg font-medium">No assets available</p>
            <p className="text-sm">
              Please check back later or contact HR
            </p>
          </div>
        )}

        {assets.map((asset) => (
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
                <span className="badge badge-soft badge-primary">
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
                <button
                  type="submit"
                  className="btn btn-primary transition-transform duration-300 hover:scale-105"
                >
                  Submit Request
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="btn btn-ghost transition-transform duration-300 hover:scale-105"
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
