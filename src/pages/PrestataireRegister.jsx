import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Progress,
  Label,
  Spinner,
  TextInput,
  ToggleSwitch,
  FileInput,
  Toast,
} from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";
import * as EmailValidator from "email-validator";
import MapFinder from "../components/MapFinder";
import TimeRangePicker from "../components/TimeRangePicker";
import { useTranslation } from "react-i18next";
import axios from "axios";

function PrestataireRegister() {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const [nameError, setNameError] = useState("");
  const [salonNameError, setSalonNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [kbisError, setKbisError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isMailExisted, setMailExist] = useState(false);
  const SERVER_ENDPOINT = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;
  const [passwordSafety, setPasswordSafety] = useState(0);
  const [formData, setFormData] = useState({
    prestataire: {
      nom: "",
      prenom: "",
      plainPassword: "",
      email: "",
    },
    userId: "",
    nom: "",
    adresse: "",
    ville: "",
    codePostal: "",
    pays: "",
    latitude: "",
    longitude: "",
    kbis: null,
    horairesOuverture: {
      lundi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      mardi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      mercredi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      jeudi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      vendredi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      samedi: { checked: false, timeRange: { startTime: "", endTime: "" } },
      dimanche: { checked: false, timeRange: { startTime: "", endTime: "" } },
    },
  });
  const [lundiChecked, setLundiChecked] = useState(false);
  const [mardiChecked, setMardiChecked] = useState(false);
  const [mercrediChecked, setMercrediChecked] = useState(false);
  const [jeudiChecked, setJeudiChecked] = useState(false);
  const [vendrediChecked, setVendrediChecked] = useState(false);
  const [samediChecked, setSamediChecked] = useState(false);
  const [dimancheChecked, setDimancheChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showUnsuccessToast, setUnsuccessToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        lundi: {
          ...prevData.horairesOuverture.lundi,
          checked: lundiChecked,
          timeRange:
            prevData.horairesOuverture.lundi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.lundi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [lundiChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        mardi: {
          ...prevData.horairesOuverture.mardi,
          checked: mardiChecked,
          timeRange:
            prevData.horairesOuverture.mardi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.mardi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [mardiChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        mercredi: {
          ...prevData.horairesOuverture.mercredi,
          checked: mercrediChecked,
          timeRange:
            prevData.horairesOuverture.mercredi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.mercredi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [mercrediChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        jeudi: {
          ...prevData.horairesOuverture.jeudi,
          checked: jeudiChecked,
          timeRange:
            prevData.horairesOuverture.jeudi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.jeudi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [jeudiChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        vendredi: {
          ...prevData.horairesOuverture.vendredi,
          checked: vendrediChecked,
          timeRange:
            prevData.horairesOuverture.vendredi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.vendredi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [vendrediChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        samedi: {
          ...prevData.horairesOuverture.samedi,
          checked: samediChecked,
          timeRange:
            prevData.horairesOuverture.samedi.timeRange.startTime !== ""
              ? prevData.horairesOuverture.samedi.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [samediChecked]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      horairesOuverture: {
        ...prevData.horairesOuverture,
        dimanche: {
          ...prevData.horairesOuverture.dimanche,
          checked: dimancheChecked,
          timeRange:
            prevData.horairesOuverture.dimanche.timeRange.startTime !== ""
              ? prevData.horairesOuverture.dimanche.timeRange
              : { startTime: "09:00", endTime: "19:00" },
        },
      },
    }));
  }, [dimancheChecked]);

  useEffect(() => {
    const parts = selectedAddress.split(",");
    if (parts.length > 1) {
      const secondPart = parts[1].trim(); // "45000 Orléans"
      const thirdPart = parts[2].trim();
      const [code, ...cityParts] = secondPart.split(" ");
      setFormData({
        ...formData,
        adresse: parts[0],
        codePostal: code,
        ville: cityParts.join(" ").trim(),
        pays: thirdPart,
      });
    } else {
      setFormData({
        ...formData,
        adresse: "",
        codePostal: "",
        ville: "",
        pays: "",
      });
    }
  }, [selectedAddress]);
  const MAX_STEP = 8;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddressChange = (newAddress) => {
    setSelectedAddress(newAddress.formatted_address);
    setFormData({
      ...formData,
      latitude: newAddress.lat,
      longitude: newAddress.lng,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
  };

  const handleCategoryCheck = (e) => {
    const { id, checked } = e.target;
    let idIri = `api/categories/${id}`;
    if (checked) {
      setFormData({ ...formData, categories: [...formData.categories, idIri] });
    } else {
      setFormData({
        ...formData,
        categories: formData.categories.filter(
          (category) => category !== idIri
        ),
      });
    }
  };

  const handleTimeRangeChange = (timeRange, day) => {
    setFormData({
      ...formData,
      horairesOuverture: {
        ...formData.horairesOuverture,
        [day]: {
          ...formData.horairesOuverture[day],
          timeRange: timeRange,
        },
      },
    });
  };
  const checkStepThree = () => {
    const isValidSalonName = formData.nom !== "";
    const isValidPrestataireName = formData.prestataire.nom !== "";
    const isValidPrestatairePrename = formData.prestataire.prenom !== "";
    const isKbisEmpty = formData.kbis === null;

    let newNameError = "";
    let newSalonNameError = "";
    let newKbisError = "";

    if (isMailExisted) {
      if (isValidSalonName && !isKbisEmpty) {
        return true;
      } else {
        if (!isValidSalonName) {
          newSalonNameError = t("Etablissement_Register_Salon_Name_Required");
        }
        if (isKbisEmpty) {
          newKbisError = t("Etablissement_Register_Kbis_Required");
        }
        setSalonNameError(newSalonNameError);
        setKbisError(newKbisError);
        return false;
      }
    } else {
      if (
        isValidPrestataireName &&
        isValidPrestatairePrename &&
        isValidSalonName &&
        !isKbisEmpty
      ) {
        return true;
      } else {
        if (!isValidPrestataireName) {
          newNameError = t(
            "Etablissement_Register_Prestataire_Last_Name_Required"
          );
        }
        if (!isValidPrestatairePrename) {
          newNameError += t(
            "Etablissement_Register_Prestataire_First_Name_Required"
          );
        }
        if (!isValidSalonName) {
          newSalonNameError = t("Etablissement_Register_Salon_Name_Required");
        }
        if (isKbisEmpty) {
          newKbisError = t("Etablissement_Register_Kbis_Required");
        }

        setNameError(newNameError);
        setSalonNameError(newSalonNameError);
        setKbisError(newKbisError);
        return false;
      }
    }
  };

  const sendPost = async () => {
    let content = new FormData();
    setIsLoading(true);
    content.append("nom", formData.nom);
    content.append("adresse", formData.adresse);
    content.append(
      "horairesOuverture",
      `"${JSON.stringify(formData.horairesOuverture)}"`
    );
    if (isMailExisted) {
      content.append("prestataire", formData.userId);
    } else {
      content.append("prestataire", JSON.stringify(formData.prestataire));
    }
    content.append("kbisFile", formData.kbis);
    content.append("latitude", formData.latitude);
    content.append("longitude", formData.longitude);
    content.append("ville", formData.ville);
    content.append("codePostal", formData.codePostal);

    try {
      const response = await axios.post(
        `${SERVER_ENDPOINT}/etablissements`,
        content,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setShowSuccessToast(true);
        setTimeout(() => {
          navigate("/platform-react-cicd-challenge/");
        }, 2000);
      } else {
        setUnsuccessToast(true);
        setStep(1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkStepFour = () => {
    const hasMinLength = formData.prestataire.plainPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formData.prestataire.plainPassword);
    const hasLowerCase = /[a-z]/.test(formData.prestataire.plainPassword);
    const hasNumbers = /\d/.test(formData.prestataire.plainPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
      formData.prestataire.plainPassword
    );

    let errorMessage = "";

    if (!hasMinLength) {
      errorMessage += t("Provider_Register_Password_Error_Length");
    }
    if (!hasUpperCase) {
      errorMessage += t("Provider_Register_Password_Error_Uppercase");
    }
    if (!hasLowerCase) {
      errorMessage += t("Provider_Register_Password_Error_Lowercase");
    }
    if (!hasNumbers) {
      errorMessage += t("Provider_Register_Password_Error_Number");
    }
    if (!hasSpecialChar) {
      errorMessage += t("Provider_Register_Password_Error_Special_Char");
    }

    if (errorMessage === "") {
      return true;
    } else {
      setPasswordError(errorMessage.trim());
      return false;
    }
  };

  const nextStep = () => {
    if (step === 3) {
      if (!checkStepThree()) {
        return;
      }
      if (isMailExisted) {
        setStep(step + 2);
        return;
      }
    }

    if (step === 4) {
      if (!checkStepFour()) {
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 5 && isMailExisted) {
      setStep(step - 2);
      return;
    }
    setStep(step - 1);
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (!password) {
      return score;
    }

    // Criteria for password strength
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);

    // Increment score for each met criteria
    if (lengthCriteria) score += 20;
    if (numberCriteria) score += 20;
    if (specialCharCriteria) score += 20;
    if (uppercaseCriteria) score += 20;
    if (lowercaseCriteria) score += 20;

    return score;
  };

  const resetEmail = () => {
    setFormData({
      ...formData,
      prestataire: {
        ...formData.prestataire,
        email: " ",
      },
    });
    setStep(1);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFormData({ ...formData, kbis: event.target.files[0] });
    }
  };

  const checkMailExist = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${SERVER_ENDPOINT}/users?email=${formData.prestataire.email}`
      ); // Replace with the actual API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const users = data["hydra:member"];
      if (users.length > 0) {
        setMailExist(true);
        setFormData({ ...formData, userId: users[0]["@id"] + "" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsEmailValid(EmailValidator.validate(formData.prestataire.email));
  }, [formData.prestataire.email]);

  useEffect(() => {
    const score = evaluatePasswordStrength(formData.prestataire.plainPassword);
    setPasswordSafety(score);
  }, [formData.prestataire.plainPassword]);

  useEffect(() => {
    if (step === 2) {
      checkMailExist();
    }
  }, [step]);

  const setEmail = (e) => {
    setFormData({
      ...formData,
      prestataire: {
        ...formData.prestataire,
        email: e.target.value,
      },
    });
  };

  const setNom = (e) => {
    setFormData({
      ...formData,
      prestataire: {
        ...formData.prestataire,
        nom: e.target.value,
      },
    });
  };

  const setPrenom = (e) => {
    setFormData({
      ...formData,
      prestataire: {
        ...formData.prestataire,
        prenom: e.target.value,
      },
    });
  };

  const setPassword = (e) => {
    setFormData({
      ...formData,
      prestataire: {
        ...formData.prestataire,
        plainPassword: e.target.value,
      },
    });
  };

  const renderStepOne = () => {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <div className=" flex justify-center items-center w-1/3 h-3/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft className="text-2xl text-white" disabled={true} />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-10 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-4/5 font-bold"
                  value={t("Provider_Register_Email_Ask")}
                />
              </div>
              <TextInput
                id="base"
                type="text"
                placeholder={t("Provider_register_add_mail")}
                sizing="md"
                name="email"
                onChange={setEmail}
                value={formData.prestataire.email}
              />
            </div>
            <Button
              className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 ro    unded-lg focus:outline-none focus:shadow-outline"
              disabled={!isEmailValid}
              onClick={nextStep}
            >
              {t("Provider_register_continue")}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStepTwo = () => {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value={t("Provider_register_config_profil")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {isMailExisted === false && (
                    <>{t("Provider_register_new_user")}</>
                  )}
                  {isMailExisted === true && (
                    <>{t("Provider_register_old_user")}</>
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_register_start_installation")}
              </Button>
            </div>
            <div className="flex mt-10 justify-center">
              <p
                onClick={() => resetEmail()}
                className="text-center hover:underline w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                {t("Provider_register_try_mail") +
                  " " +
                  formData.prestataire.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepThree = () => {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value={t("Register_provider_a_propos")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {isMailExisted === false && (
                    <>{t("Provider_register_tell_more")}</>
                  )}
                  {isMailExisted === true && (
                    <>{t("Provider_register_tell_more_2")}</>
                  )}
                </p>
              </div>
              {salonNameError !== "" && (
                <div className="flex mb-1 justify-center">
                  <p className="text-center w-4/5 text-sm font-normal text-red-500">
                    {salonNameError}
                  </p>
                </div>
              )}
              <TextInput
                className="mb-4"
                id="base"
                type="text"
                placeholder={t("Register_provider_salon_name")}
                sizing="md"
                name="nom"
                onChange={onChange}
                value={formData.nom}
              />
              {nameError !== "" && (
                <div className="flex mb-1 justify-center">
                  <p className="text-center w-4/5 text-sm font-normal text-red-500">
                    {nameError}
                  </p>
                </div>
              )}
              {isMailExisted === false && (
                <div className="flex mb-4 justify-between">
                  <TextInput
                    id="base"
                    type="text"
                    placeholder={t("Register_provider_name")}
                    sizing="md"
                    name="prestataire.nom"
                    onChange={setNom}
                    value={formData.prestataire.nom}
                  />
                  <TextInput
                    id="base"
                    type="text"
                    placeholder={t("Register_provider_prename")}
                    sizing="md"
                    name="prestataire.prenom"
                    onChange={setPrenom}
                    value={formData.prestataire.prenom}
                  />
                </div>
              )}
              {kbisError !== "" && (
                <div className="flex mb-1 justify-center">
                  <p className="text-center w-4/5 text-sm font-normal text-red-500">
                    {kbisError}
                  </p>
                </div>
              )}
              <div>
                <FileInput
                  id="file-upload"
                  helperText={t("Provider_register_download_kbis")}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_register_continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepFour = () => {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-200">
        <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value={t("Provider_register_pw_config")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t("Provider_register_password_description")}
                </p>
              </div>
              {passwordError !== "" && (
                <div className="flex mb-1 justify-center">
                  <p className="text-center w-4/5 text-sm font-normal text-red-500">
                    {passwordError}
                  </p>
                </div>
              )}
              <div className="flex mt-4 justify-center">
                <div className="flex">
                  <TextInput
                    id="base"
                    className="w-4/5"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    sizing="md"
                    name="password"
                    onChange={setPassword}
                    value={formData.prestataire.plainPassword}
                  />
                  <Button
                    className="bg-white hover:bg-blue-700 w-1/5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="text-2xl text-black" />
                    ) : (
                      <FaRegEye className="text-2xl text-black" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex w-full mt-6 items-center justify-center px-2">
                <Progress
                  className="w-80"
                  progress={passwordSafety}
                  color={
                    passwordSafety < 33
                      ? "red"
                      : passwordSafety < 66
                      ? "yellow"
                      : "green"
                  }
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_register_continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepFive = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className=" flex justify-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="bg-rent-a-gf bg-cover rounded-t-xl flex w-full h-52 items-start justify-start px-2">
              <FaArrowLeft
                className="text-2xl mt-10 ml-10 text-white hover:text-blue-700"
                onClick={prevStep}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-4/5 font-bold"
                  value={t("Provider_register_where_to_find")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t("Provider_register_where_to_find_2")}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_register_continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepSix = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className=" flex justify-center items-center w-2/5 h-4/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <MapFinder onAddressSelect={handleAddressChange} />
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_register_continue")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepSeven = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className="flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-6 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value={t("Provider_Register_Where_Address_Title")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t("Provider_register_where_to_find_2")}
                </p>
              </div>
              <div className="mt-4">
                <TextInput
                  id="adresse"
                  className="w-full mb-2"
                  placeholder={t("Provider_register_add_n_num")}
                  sizing="md"
                  name="adresse"
                  onChange={onChange}
                  value={formData.adresse}
                />
                <TextInput
                  id="ville"
                  className="w-full mb-2"
                  placeholder={t("Provider_register_city")}
                  sizing="md"
                  name="ville"
                  onChange={onChange}
                  value={formData.ville}
                />
                <TextInput
                  id="postalCode"
                  className="w-full mb-2"
                  placeholder={t("Provider_register_cp")}
                  sizing="md"
                  name="codePostal"
                  onChange={onChange}
                  value={formData.codePostal}
                />
                <TextInput
                  id="pays"
                  className="w-full"
                  placeholder={t("Provider_register_country")}
                  sizing="md"
                  name="pays"
                  onChange={onChange}
                  value={formData.pays}
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="block w-full">
                <Button
                  className="bg-black uppercase w-full mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={nextStep}
                >
                  {t("Provider_register_continue")}
                </Button>
                <Button
                  className="bg-white uppercase w-full hover:bg-blue-700 text-red-600 border-slate-600 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={prevStep}
                >
                  {t("Provider_register_reintialize")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepEight = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className=" flex justify-center items-center w-3/5 h-4/5 bg-white rounded-xl">
          <div>
            <div className="flex w-full items-center justify-center px-2">
              <FaArrowLeft
                className="text-2xl text-black hover:text-blue-700"
                onClick={prevStep}
              />
              <Progress
                className="w-48 min-w-full ml-4 mr-8 pr-6"
                progress={(step / MAX_STEP) * 100}
                color="green"
              />
              <FaArrowRight
                className="text-2xl ml-8 text-white"
                disabled={true}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-3xl text-center w-full font-bold"
                  value={t("Provider_register_horairres")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t("Provider_register_when_to_find")}
                </p>
              </div>
              <div className="flex mt-4 w-full justify-center items-center divide-y">
                <div className="w-full">
                  <div className="w-full mb-2 mt-4 max-w-md flex-col">
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={lundiChecked}
                        label={t("Common_monday")}
                        onChange={setLundiChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={lundiChecked}
                          day="lundi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={mardiChecked}
                        label={t("Common_tuesday")}
                        onChange={setMardiChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={mardiChecked}
                          day="mardi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={mercrediChecked}
                        label={t("Common_wedday")}
                        onChange={setMercrediChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={mercrediChecked}
                          day="mercredi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={jeudiChecked}
                        label={t("Common_thursday")}
                        onChange={setJeudiChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={jeudiChecked}
                          day="jeudi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={vendrediChecked}
                        label={t("Common_friday")}
                        onChange={setVendrediChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={vendrediChecked}
                          day="vendredi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={samediChecked}
                        label={t("Common_saturday")}
                        onChange={setSamediChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={samediChecked}
                          day="samedi"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mb-3">
                      <ToggleSwitch
                        className="w-32 no-padding-btn"
                        checked={dimancheChecked}
                        label={t("Common_sunday")}
                        onChange={setDimancheChecked}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        <TimeRangePicker
                          show={dimancheChecked}
                          day="dimanche"
                          onTimeRangeChange={(timeRange, day) =>
                            handleTimeRangeChange(timeRange, day)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                disabled={isLoading}
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={sendPost}
              >
                {t("Provider_register_confirm")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form
      className="w-screen flex justify-center items-center h-screen"
      onSubmit={onSubmit}
    >
      {showSuccessToast && (
        <Toast className="fixed bottom-4 right-4 flex items-center">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {t("Provider_register_success")}
          </div>
          <Toast.Toggle />
        </Toast>
      )}
      {showUnsuccessToast && (
        <Toast className="fixed bottom-4 right-4 flex items-center">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {t("Provider_register_failure")}
          </div>
          <Toast.Toggle />
        </Toast>
      )}
      {step === 1
        ? renderStepOne()
        : step === 2
        ? renderStepTwo()
        : step === 3
        ? renderStepThree()
        : step === 4
        ? renderStepFour()
        : step === 5
        ? renderStepFive()
        : step === 6
        ? renderStepSix()
        : step === 7
        ? renderStepSeven()
        : step === 8
        ? renderStepEight()
        : null}
    </form>
  );
}
export default PrestataireRegister;
