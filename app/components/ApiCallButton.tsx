"use client";
const protectedCall = async () => {
  try {
    const res = await fetch("/api/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData?.message);
    }
    alert(responseData?.message)
  } catch (err) {
    alert(err);
  }
};
const ApiCallButton = () => {
  return (
    <button
      onClick={protectedCall}
      className="text-white p-3 rounded-lg bg-neutral-950"
    >
      Make an auth protected API call
    </button>
  );
};

export default ApiCallButton;
