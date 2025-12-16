import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditAsset = ({ asset, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      productName: asset.productName,
      productImage: asset.productImage,
      productType: asset.productType,
      productQuantity: asset.productQuantity,
    },
  });

  const onSubmit = async (data) => {
    await axiosSecure.patch(`/assets/${asset._id}`, data);
    Swal.fire("Updated!", "Asset updated successfully", "success");
    refetch();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-base-100 w-full max-w-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Edit Asset</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("productName")}
            className="input input-bordered w-full"
            placeholder="Asset Name"
          />

          <input
            {...register("productImage")}
            className="input input-bordered w-full"
            placeholder="Image URL"
          />

          <select
            {...register("productType")}
            className="select select-bordered w-full"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          <input
            type="number"
            {...register("productQuantity")}
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;
