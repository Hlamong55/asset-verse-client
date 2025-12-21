import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: employees = [], refetch, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const { data: hr = {} } = useQuery({
  queryKey: ["hr-info"],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/${user.email}`);
    return res.data;
  },
  });


  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove employee?",
      text: "Employee will be removed from your team",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/employees/remove/${id}`);
      Swal.fire("Removed", "Employee removed successfully", "success");
      refetch();
    } catch {
      Swal.fire("Error", "Failed to remove employee", "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-4xl font-bold text-center">My Employee List</h2>
      <p className="text-center text-gray-600 mt-2">
        Manage employees affiliated with your company
      </p>

      <p className={`text-center text-xl mt-5 font-bold ${ hr.currentEmployees >= hr.packageLimit
      ? "text-error"
      : "text-primary"
      }`}
>
  {hr.currentEmployees}/{hr.packageLimit} employees used
</p>


      {employees.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No employees affiliated yet
        </div>
      )}

      {employees.length > 0 && (
        <div className="w-full overflow-x-auto mt-6">
          <table className="table table-zebra min-w-225">
            <thead>
              <tr>
                <th >Employee</th>
                <th>Email</th>
                <th>Join Date</th>
                <th className="text-center hidden md:table-cell">Assets</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={
                        emp.photo ||
                        "https://i.ibb.co/9gYV1YB/avatar.png"
                      }
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <span className="text-lg font-bold hidden sm:table-cell">{emp.name}</span>
                  </td>

                  <td className="text-lg font-semibold">{emp.email}</td>

                  <td className="text-lg font-semibold">
                    {new Date(emp.joinDate).toLocaleDateString()}
                  </td>

                  <td className="font-semibold text-center text-lg hidden sm:table-cell">
                    {emp.assetsCount}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleRemove(emp._id)}
                      className="btn btn-sm btn-outline text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Remove
                    </button>
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

export default EmployeeList;
