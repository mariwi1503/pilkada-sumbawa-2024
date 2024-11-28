import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p>Unexpected error occured</p>
      <p className="text-red-500">{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;
