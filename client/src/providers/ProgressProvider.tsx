import { App } from "antd";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the theme
const ProgressContext = createContext(null);

// Create a provider component
export const ProgressProvider = ({ children }: any) => {
  const [moduleProgress, setModuleProgress] = useState<any>({});
  const { notification } = App.useApp();

  const getCurrentModuleStatus = async () => {
    try {
      // updating a single module status
      const updatedUserProgressModule = await fetch("/api/v1/progress", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await updatedUserProgressModule.json();

      if (res.status === 200) {
        setModuleProgress(res?.userProgress);
      }
    } catch (err) {
      console.log("Error while getting module progress", err);
    }
  };

  useEffect(() => {
    getCurrentModuleStatus();
  }, []);

  const updateModuleProgress = async (data: any) => {
    try {
      const updatedUserProgressModule = await fetch("/api/v1/progress", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await updatedUserProgressModule.json();

      if (res.status === 200) {
        setModuleProgress(res?.updatedModuleProgress);
        notification.success({
          message:
            data?.status !== 0
              ? "Marked successfully"
              : "Unmarked successfully",
          placement: "bottomRight",
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        message: `${error}`,
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  const progressContext = {
    moduleProgress,
    updateModuleProgress,
  };

  return (
    <ProgressContext.Provider value={progressContext}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => useContext(ProgressContext);
