import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const t = useTranslation();

const STATUS_MESSAGES = {
  404: {
    reason: t("Error_404_Reason"),
    message: t("Error_404_Message"),
  },
  500: {
    reason: t("Error_500_Reason"),
    message: t("Error_500_Message"),
  },
  default: {
    reason: t("Common_Error_Reason"),
    message: t("Common_Error_Message"),
  },
};

export const ErrorComponent = ({ status }) => {
  const [reason, setReason] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const statusMessage = STATUS_MESSAGES[status] || STATUS_MESSAGES.default;
    setReason(statusMessage.reason);
    setMessage(statusMessage.message);
  }, [status]);

  return (
    <div className="text-white h-full flex flex-col mt-32 items-center">
      <p className="font-bold mb-5">{status}</p>
      <h1 className="font-bold">{reason}</h1>
      <p className="opacity-70 font-medium mt-5">{message}</p>
      <button type="button" className="mt-8" onClick={() => navigate(-1)}>
        <FaArrowLeft className="inline-block mr-2 mb-1" />
        {t("Common_Go_Back")}
      </button>
    </div>
  );
};
