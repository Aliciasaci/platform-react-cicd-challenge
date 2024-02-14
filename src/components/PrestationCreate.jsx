import { useState, useEffect } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { FaXmark, FaArrowRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const PrestationCreateModal = ({ onClose, onSubmitPrestation }) => {
  const { t } = useTranslation();
  const [serviceName, setServiceName] = useState("");
  const [serviceDurationHours, setServiceDurationHours] = useState("01");
  const [serviceDurationMinutes, setServiceDurationMinutes] = useState("00");
  const [servicePrice, setServicePrice] = useState("");
  const [validationError, setValidationError] = useState(
    t("Provider_Register_Add_Services_Error_Empty")
  );
  const [isValid, setIsValid] = useState(true);
  const maxChars = 50;

  const validateInput = () => {
    let error = "";

    if (!serviceName || serviceName.length > maxChars) {
      error = t("Provider_Register_Add_Services_Name_Error_Length");
    } else if (!servicePrice || isNaN(servicePrice)) {
      error = t("Provider_Register_Add_Services_Price_Error_Valid_Number");
    } else if (
      serviceDurationHours === "00" &&
      serviceDurationMinutes === "00"
    ) {
      error = t(
        "Provider_Register_Add_Services_Duration_Error_Positive_Number"
      );
    }

    setValidationError(error);
    setIsValid(!error);
  };

  useEffect(() => {
    validateInput();
  }, [serviceName, serviceDurationHours, serviceDurationMinutes, servicePrice]);

  const handleSubmit = () => {
    const prestationInfo = {
      name: serviceName,
      durationHours: serviceDurationHours,
      durationMinutes: serviceDurationMinutes,
      price: servicePrice,
    };
    onSubmitPrestation(prestationInfo);
  };

  const handleServiceNameChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setServiceName(e.target.value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="flex justify-center w-2/5 h-4/5 bg-white rounded-xl">
        <div>
          <div className="form-group justify-center mt-10 mb-10">
            <div className="mb-2 w-full flex justify-center px-4 items-center">
              <FaXmark
                className="text-2xl text-black hover:text-blue-700"
                onClick={onClose}
              />
              <Label
                htmlFor="base"
                className="text-3xl text-center w-full font-bold"
                value="Ajouter une prestation"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="flex justify-center">
              <p className="text-left w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                {t("Provider_Register_Add_Services_Description")}
              </p>
            </div>
            <div className="block mt-4 w-full items-center">
              <div className="w-full flex mt-3 justify-center">
                <div className="w-4/5 mt-4">
                  <div className="mb-2 block text-left">
                    <Label
                      className="justify-start"
                      htmlFor="serviceName"
                      value={t("Common_Service_Name")}
                    />
                  </div>
                  <TextInput
                    id="serviceName"
                    className="w-full"
                    required
                    value={serviceName}
                    onChange={handleServiceNameChange}
                    helperText={
                      <div className="text-right">
                        {`${serviceName.length}/${maxChars}`}
                      </div>
                    }
                  />
                  <div className="mb-2 block text-left">
                    <Label
                      className="justify-start font-bold"
                      value={t("Common_Service_Duration")}
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="block w-2/5 justify-start">
                      <div className="mb-2 text-left block">
                        <Label htmlFor="hours" value={t("Common_Hours")} />
                      </div>
                      <Select
                        id="hours"
                        required
                        value={serviceDurationHours}
                        onChange={(e) =>
                          setServiceDurationHours(e.target.value)
                        }
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="block w-2/5 justify-start">
                      <div className="mb-2 text-left block">
                        <Label htmlFor="minutes" value="Minutes" />
                      </div>
                      <Select
                        id="minutes"
                        required
                        value={serviceDurationMinutes}
                        onChange={(e) =>
                          setServiceDurationMinutes(e.target.value)
                        }
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="my-4 block text-left">
                    <Label
                      className="justify-start"
                      htmlFor="servicePrice"
                      value={t("Common_Price")}
                    />
                  </div>
                  <TextInput
                    id="servicePrice"
                    className="w-full"
                    required
                    addon="€"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="block w-full mt-4 justify-center">
            <div className="flex justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
                disabled={!isValid}
              >
                {t("Common_Continue")}
              </Button>
            </div>
            <div className="flex mt-3 justify-center">
              <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                {validationError}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestationCreateModal;
