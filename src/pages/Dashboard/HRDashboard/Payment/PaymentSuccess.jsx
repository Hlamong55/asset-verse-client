import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const sessionId = new URLSearchParams(location.search).get("session_id");

  const hasConfirmedRef = useRef(false);
  const [status, setStatus] = useState( sessionId ? "processing" : "error" );

  useEffect(() => {
    if (!sessionId) return;
    if (hasConfirmedRef.current) return;
    hasConfirmedRef.current = true;

    axiosSecure
      .post("/confirm-upgrade", { sessionId })
      .then(() => {
        Swal.fire("Success", "Package upgraded successfully", "success");
        navigate("/dashboard/hr/upgrade-package");
      })
      .catch(() => {
        setStatus("error");
        Swal.fire("Error", "Upgrade confirmation failed", "error");
      });
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="h-[70vh] flex items-center justify-center text-center">
      {status === "processing" && (
        <div>
          <h2 className="text-3xl font-bold animate-pulse">Processing Payment...</h2>
          <p className="text-gray-700 font-medium mt-2">
            Please wait while we confirm your payment
          </p>
        </div>
      )}

      {status === "error" && (
        <div>
          <h2 className="text-3xl font-bold text-red-600">
            Payment Confirmation Failed
          </h2>
          <p className="text-gray-700 font-medium mt-2">
            Something went wrong. Please try again.
          </p>

          <button
            onClick={() => navigate("/dashboard/hr/upgrade-package")}
            className="btn btn-primary mt-5"
          >
            Back to Upgrade Page
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
