import { memo, useEffect } from "react";

const Error404Page = memo(() => {
  useEffect(() => {
    document.title = "Error - 404";
  }, []);

  return <div>Error404Page</div>;
});

export default Error404Page;
