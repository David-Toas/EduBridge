import React from 'react';
import { AlertCircle } from "lucide-react";

interface NotificationAlertProps {
  show: boolean;
  message: string;
  type: "success" | "error";
}

const NotificationAlert = ({ show, message, type }: NotificationAlertProps) => {
  if (!show) return null;
  
  return (
    <div
      className={`p-4 mb-4 rounded-md ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      <div className="flex">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotificationAlert;
