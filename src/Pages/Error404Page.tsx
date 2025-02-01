import { memo, useEffect } from "react";
import { Link } from "react-router-dom";

const Error404Page = memo(() => {
  useEffect(() => {
    document.title = "NOT - FOUND";
  }, []);

  return (
    <main className="fixed inset-0 z-50 w-full h-full">
      <h1 className="absolute top-12 w-full text-center p-2 bg-zinc-300 dark:bg-secondaryColor dark:bg-opacity-80 text-black dark:text-white text-2xl font-bold uppercase">
        you are in the wrong path
      </h1>
      <img
        src="/images/not-found-img.jpg"
        alt="not-found-image"
        className="w-full h-full object-cover"
      />
      <p className="flex flex-col justify-center items-center absolute bottom-12 text-center capitalize w-full p-2 text-lg font-bold bg-zinc-300 dark:bg-secondaryColor dark:bg-opacity-80 text-black dark:text-white">
        the page you are looking for doesn't exist
        <Link
          to="/dashboard"
          className="text-lg text-black dark:text-white bg-primaryColor font-bold underline p-1 rounded-lg"
        >
          Dashboard
        </Link>
      </p>
    </main>
  );
});

export default Error404Page;
