import React from "react";

function page({ params }) {
  return (
    <div>
      welcome to the dashboard {params.name}
      <br />
      <h1>this dynamic route folder</h1>
    </div>
  );
}

export default page;
