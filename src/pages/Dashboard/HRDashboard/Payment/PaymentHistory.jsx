import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-40 font-medium">Loading payments...</div>;
  }

  return (
    <div className="bg-base-100 p-6 md:p-8 rounded-2xl shadow">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center">
        Payment History
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Subscription payment records
      </p>

      {payments.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No payment history found
        </div>
      ) : (
        <div className="overflow-x-auto mt-14">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Package</th>
                <th>Employee Limit</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Transaction ID</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td className="font-semibold">{p.packageName}</td>

                  <td className="text-center">{p.employeeLimit}</td>

                  <td className="font-medium">
                    ${Number(p.amount).toFixed(2)}
                  </td>

                  <td>
                    {new Date(p.paymentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td>
                    <span
                      className={`badge capitalize ${
                        p.status === "completed"
                          ? "badge-success"
                          : p.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className=" text-gray-700 break-all">
                    {p.transactionId}
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

export default PaymentHistory;
