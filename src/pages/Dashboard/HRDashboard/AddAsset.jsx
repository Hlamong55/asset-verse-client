import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaBoxOpen } from "react-icons/fa";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const assetData = {
      productName: data.productName,
      productImage: data.productImage,
      productType: data.productType,
      productQuantity: Number(data.productQuantity),
    };

    try {
      await axiosSecure.post("/assets", assetData);

      Swal.fire({
        icon: "success",
        title: "Asset Added Successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/dashboard/hr/asset-list");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to add asset",
        "error"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
          <FaBoxOpen className="text-2xl" />
        </div>
        <h2 className="text-4xl font-extrabold">Add New Asset</h2>
        <p className="text-gray-700 mt-2">
          Add and manage company assets for your employees
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 border border-base-300 rounded-2xl shadow-md p-8 space-y-6"
      >
        <div>
          <label className="label">
            <span className="label-text font-medium">Asset Name</span>
          </label>
          <input
            {...register("productName", {
              required: "Asset name is required",
            })}
            className="input py-6 text-gray-700 input-bordered w-full"
            placeholder="e.g. MacBook Pro"
          />
          {errors.productName && (
            <p className="text-error text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Asset Image URL</span>
          </label>
          <input
            {...register("productImage", {
              required: "Image URL is required",
            })}
            className="input py-6 input-bordered text-gray-700 w-full"
            placeholder="ImgBB / Cloudinary image link"
          />
          {errors.productImage && (
            <p className="text-error text-sm mt-1">
              {errors.productImage.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text font-medium">Asset Type</span>
            </label>
            <select
              {...register("productType", { required: true })}
              className="select select-bordered text-gray-700  w-full"
            >
              <option value="">Select asset type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Quantity</span>
            </label>
            <input
              type="number"
              min={1}
              {...register("productQuantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
              className="input input-bordered text-gray-700 w-full"
              placeholder="e.g. 10"
            />
            {errors.productQuantity && (
              <p className="text-error text-sm mt-1">
                {errors.productQuantity.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full text-lg rounded-xl
                       transition-transform duration-200 hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
