// ReceiptPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Receipt {
  merchantReference: string;
  orderTrackingId: string;
  payment_status_description: string;
  payment_method: string;
  amount: string;
}

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>(); // <-- get id from route
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/receipt/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Receipt not found");
        return res.json();
      })
      .then((data) => setReceipt(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading receipt...</p>;
  if (!receipt) return <p className="text-center mt-10 text-red-600">Receipt not found</p>;

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-green-600">
        Payment Receipt
      </h1>
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Merchant Reference:</span> {receipt.merchantReference}
        </p>
        <p>
          <span className="font-semibold">Tracking ID:</span> {receipt.orderTrackingId}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-md ${
              receipt.payment_status_description === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {receipt.payment_status_description}
          </span>
        </p>
        <p>
          <span className="font-semibold">Method:</span> {receipt.payment_method}
        </p>
        <p>
          <span className="font-semibold">Amount:</span> {receipt.amount || "KES 0"}
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={() => window.location.href = "http://localhost:8080"}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
