// src/components/AuthPageWrapper.jsx
export default function AuthPageWrapper({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        {children}
      </div>
    );
  }
  