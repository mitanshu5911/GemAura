import { createContext, useContext, useState } from "react";
import AlertToast from "../components/common/AlertToast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const showToast = (
    type = "success",
    message = ""
  ) => {
    setToast({
      visible: true,
      type,
      message,
    });
  };

  const showSuccess = (message) => {
    showToast("success", message);
  };

  const showError = (message) => {
    showToast("error", message);
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
      }}
    >
      {children}

      <AlertToast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider"
    );
  }

  return context;
};
