import { createContext, useContext, useState } from "react";
import Loading from "../components/common/Loading";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    show: false,
    message: "Preparing your experience",
  });

  const startLoading = (
    message = "Preparing your experience"
  ) => {
    setLoading({
      show: true,
      message,
    });
  };

  const stopLoading = () => {
    setLoading({
      show: false,
      message: "",
    });
  };

  return (
    <LoadingContext.Provider
      value={{
        loading: loading.show,
        startLoading,
        stopLoading,
      }}
    >
      {children}

      {loading.show && (
        <Loading message={loading.message} />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(
      "useLoading must be used within LoadingProvider"
    );
  }

  return context;
};
