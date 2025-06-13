"use client"

import Events from "@/app/(ui)/Components/pages/Events/Events";

const Page = () => {
  return (
    <div>
      <Events />
      {/* <button
  onClick={async () => {
    await fetch("/api/host/event", {
      method: "DELETE",
      credentials: "include",
    });
  }}
  className="text-white"
>
  Delete
</button> */}

    </div>
  );
}

export default Page;




