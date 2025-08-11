import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="px-2 sm:px-4 py-4 min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, white 0%, #dbeafe 50%, white 100%)",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 1000px",
      }}
    >
      {/* Big 404 */}
      <h1 className="text-9xl font-bold text-blue-500">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to home button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
