import { useState, useMemo } from "react";
import {
  Button,
  Progress,
  Label,
  TextInput,
  Checkbox,
  ToggleSwitch,
  Select,
} from "flowbite-react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegEye,
  FaRegEyeSlash,
  FaPlus,
  FaXmark,
} from "react-icons/fa6";
import MapFinder from "./MapFinder";
import TimeRangePicker from "./TimeRangePicker";
import PrestationCreateModal from "./PrestationCreate";
import { useTranslation } from "react-i18next";

function PrestataireRegister() {
  const [step, setStep] = useState(1);
  const [createModal, setCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    companyCity: "",
    companyState: "",
    companyZip: "",
    companyPhone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [lundi, setLundi] = useState(true);
  const [mardi, setMardi] = useState(true);
  const [mercredi, setMercredi] = useState(true);
  const [jeudi, setJeudi] = useState(true);
  const [vendredi, setVendredi] = useState(true);
  const [samedi, setSamedi] = useState(false);
  const [prestations, setPrestations] = useState([]);
  const addressString = useMemo(() => {
    return selectedAddress.split(",")[0];
  }, [selectedAddress]);
  const [postalCode, city] = useMemo(() => {
    const parts = selectedAddress.split(",");
    if (parts.length > 1) {
      const secondPart = parts[1].trim(); // "45000 Orléans"
      const [code, ...cityParts] = secondPart.split(" ");
      return [code, cityParts.join(" ").trim()];
    }
    return ["", ""];
  }, [selectedAddress]);
  const MAX_STEP = 11;
  const JOB_CATEGORIES = {
    1: "Coiffeur",
    2: "Esthéticienne",
    3: "Manucure",
    4: "Pédicure",
    5: "Maquilleur",
    6: "Styliste",
    7: "Barbier",
    8: "Tatoueur",
    9: "Piercing",
    10: "Autre",
  };
  const { t } = useTranslation();

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    state,
    zip,
    phone,
    companyName,
    companyAddress,
    companyCity,
    companyState,
    companyZip,
    companyPhone,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddressChange = (newAddress) => {
    setSelectedAddress(newAddress);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
  };

  const validateEmail = (email) => {
    return email.length === 0 || !email.includes("@");
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCloseCreatePrestation = () => {
    setCreateModal(false);
  };

  const handleSubmitCreatePrestation = (prestationInfo) => {
    setPrestations([...prestations, prestationInfo]);
    setCreateModal(false);
  };

  const renderStepOne = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
              <div className="mb-10 block flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-4/5 font-bold"
                  value={t("Provider_Register_Email_Phrase")}
                />
              </div>
              <TextInput
                id="base"
                type="text"
                placeholder={t("Common_Email")}
                sizing="md"
                name="email"
                onChange={onChange}
                value={formData.email}
              />
            </div>
            <Button
              className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={validateEmail(formData.email)}
              onClick={nextStep}
            >
              {t("Common_Continue")}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStepTwo = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
              <div className="mb-2 block flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value={t("Provider_Register_Configure_Title")}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {t("Provider_Register_Configure_Subtitle")}
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                {t("Provider_Register_Start_Button")}
              </Button>
            </div>
            <div className="flex mt-10 justify-center">
              <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                {t("Provider_Register_Try_Other_Email", { email: email })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepThree = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
              <div className="mb-2 block justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value="À propos de vous"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Parlez-nous plus en détail de vous et de votre entreprise.
                </p>
              </div>
              <TextInput
                className="mt-4"
                id="base"
                type="text"
                placeholder="Nom du salon"
                sizing="md"
                name="companyName"
                onChange={onChange}
                value={formData.companyName}
              />
              <div className="flex mt-4 justify-between">
                <TextInput
                  id="base"
                  type="text"
                  placeholder="Nom"
                  sizing="md"
                  name="lastName"
                  onChange={onChange}
                  value={formData.lastName}
                />
                <TextInput
                  id="base"
                  type="text"
                  placeholder="Prénom"
                  sizing="md"
                  name="firstName"
                  onChange={onChange}
                  value={formData.firstName}
                />
              </div>
              <div className="flex mt-4 justify-between">
                <TextInput
                  className="w-3/12"
                  id="base"
                  type="text"
                  placeholder="Prefix"
                  icon={FaPlus}
                  sizing="md"
                  onChange={onChange}
                />
                <TextInput
                  className="w-8/12"
                  id="base"
                  type="text"
                  placeholder="Votre numéro de mobile"
                  sizing="md"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepFour = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
              <div className="mb-2 block flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value="Configuration du mot de passe"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Entrer le mot de passe pour votre profil professionnel.
                </p>
              </div>
              <div className="flex mt-4 justify-between items-center">
                <TextInput
                  id="base"
                  className="w-4/5"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  sizing="md"
                  name="password"
                  onChange={onChange}
                  value={formData.password}
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
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
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
              <div className="mb-2 block flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value="Choisissez votre catégorie professionnelle"
                />
              </div>
              <div className="flex mt-4 w-full justify-center items-center divide-y">
                <div className="w-full divide-y max-h-60 overflow-y-auto mx-10">
                  {renderCheckboxes()}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
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
        <div className=" flex justify-center w-2/5 h-3/5 bg-white rounded-xl">
          <div>
            <div className="bg-rent-a-gf bg-cover rounded-t-xl flex w-full h-52 items-start justify-start px-2">
              <FaArrowLeft
                className="text-2xl mt-10 ml-10 text-white hover:text-blue-700"
                onClick={prevStep}
              />
            </div>
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 block flex justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-4/5 font-bold"
                  value="Où vos clients peuvent-ils vous trouver ?"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Parlez-nous davantage de votre travail afin que nous puissions
                  envoyer vos clients au bon endroit.
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
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
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepEight = () => {
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
            <div className="form-group mt-10 mb-10">
              <div className="mb-2 block justify-center">
                <Label
                  htmlFor="base"
                  className="text-2xl text-center w-full font-bold"
                  value="Votre adresse"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Où le client peut-il vous trouver ?
                </p>
              </div>
              <div className="mt-4">
                <TextInput
                  id="address"
                  className="w-full mb-4"
                  placeholder="Adresse et numéro"
                  sizing="md"
                  name="addresse"
                  onChange={onChange}
                  value={addressString}
                />
                <TextInput
                  id="city"
                  className="w-full mb-4"
                  placeholder="Ville"
                  sizing="md"
                  name="city"
                  onChange={onChange}
                  value={city}
                />
                <TextInput
                  id="postalCode"
                  className="w-full"
                  placeholder="Code Postal"
                  sizing="md"
                  name="codePostal"
                  onChange={onChange}
                  value={postalCode}
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="block w-full">
                <Button
                  className="bg-black uppercase w-full mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={nextStep}
                >
                  Continuer
                </Button>
                <Button
                  className="bg-white uppercase w-full hover:bg-blue-700 text-red-600 border-slate-600 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={prevStep}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepNine = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
              <div className="mb-2 block justify-center">
                <Label
                  htmlFor="base"
                  className="text-3xl text-center w-full font-bold"
                  value="Quel est votre effectif d'équipe ?"
                />
              </div>
              <div className="flex mt-4 w-full justify-center items-center divide-y">
                <div className="w-full mx-10">
                  <div className="w-full justify-center pt-2 mb-2 mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox id="solo" />
                      <Label className="text-lg" htmlFor="solo">
                        Je suis seul
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox id="small" />
                      <Label className="text-lg" htmlFor="small">
                        2 à 3 collaborateurs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox id="medium" />
                      <Label className="text-lg" htmlFor="medium">
                        4 à 6 collaborateurs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox id="large" />
                      <Label className="text-lg" htmlFor="large">
                        Plus de 6 collaborateurs
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepTen = () => {
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
              <div className="mb-2 block justify-center">
                <Label
                  htmlFor="base"
                  className="text-3xl text-center w-full font-bold"
                  value="Vos heures d'ouverture"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Quand les clients peuvent-ils effectuer une réservation chez
                  vous ?
                </p>
              </div>
              <div className="flex mt-4 w-full justify-center items-center divide-y">
                <div className="w-full">
                  <div className="w-full mb-2 mt-4 max-w-md flex-col">
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={lundi}
                        label="Lundi"
                        onChange={setLundi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {lundi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={mardi}
                        label="Mardi"
                        onChange={setMardi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {mardi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={mercredi}
                        label="Mercredi"
                        onChange={setMercredi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {mercredi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={jeudi}
                        label="Jeudi"
                        onChange={setJeudi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {jeudi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={vendredi}
                        label="Vendredi"
                        onChange={setVendredi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {vendredi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mb-3">
                      <ToggleSwitch
                        className="w-32"
                        checked={samedi}
                        label="Samedi"
                        onChange={setSamedi}
                      />
                      <div className="flex w-4/5 max-w-xs justify-center">
                        {samedi ? (
                          <TimeRangePicker />
                        ) : (
                          <span className="text-sm text-black">Fermé</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepEleven = () => {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
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
            <div className="form-group justify-center mt-10 mb-10">
              <div className="mb-2 w-full block justify-center">
                <Label
                  htmlFor="base"
                  className="text-3xl text-center w-3/5 font-bold"
                  value="Commencer à ajouter des prestations"
                />
              </div>
              <div className="flex justify-center">
                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Ajouter au moins une prestation maintenant. Plus tard, vous
                  pourrez en ajouter d&apos;autres, modifier les informations,
                  et regrouper les prestations en catégories.
                </p>
              </div>
              <div className="block mt-4 w-full justify-center items-center">
                <div className="w-full block mt-3 justify-center">
                  {prestations.length > 0 && (
                    <div className="w-full flex justify-center">
                      <div className="block w-4/5">
                        {prestations.map((prestation, index) => (
                          <div
                            key={index}
                            className="flex w-full justify-around items-center"
                          >
                            <Label
                              className="text-lg text-center w-1/4"
                              value={`Nom: ${prestation.name}`}
                            />
                            <div className="flex justify-center w-1/4">
                              <Label
                                className="text-sm text-center"
                                value={`${prestation.durationHours}H`}
                              />
                              <Label
                                className="text-sm text-center"
                                value={`${prestation.durationMinutes}M`}
                              />
                            </div>
                            <Label
                              className="text-sm text-center w-1/4"
                              value={`${prestation.price}€`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="w-full flex mt-3 justify-center">
                    <Button color="gray" onClick={() => setCreateModal(true)}>
                      <FaPlus className="mr-2 h-5 w-5" />
                      Ajouter une prestation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mt-4 justify-center">
              <Button
                className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={nextStep}
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckboxes = () => {
    return Object.values(JOB_CATEGORIES).map((item, index) => {
      return (
        <div className="w-full h-8 pt-2 mb-2 mt-4" key={index}>
          <Checkbox id={item} />
          <Label
            htmlFor={`checkbox-${index}`}
            value={item}
            className="text-md ml-4 text-center"
          />
        </div>
      );
    });
  };

  return (
    <form
      className="w-screen flex justify-center items-center h-screen"
      onSubmit={onSubmit}
    >
      {createModal ? (
        <PrestationCreateModal
          onClose={handleCloseCreatePrestation}
          onSubmitPrestation={handleSubmitCreatePrestation}
        />
      ) : step === 1 ? (
        renderStepOne()
      ) : step === 2 ? (
        renderStepTwo()
      ) : step === 3 ? (
        renderStepThree()
      ) : step === 4 ? (
        renderStepFour()
      ) : step === 5 ? (
        renderStepFive()
      ) : step === 6 ? (
        renderStepSix()
      ) : step === 7 ? (
        renderStepSeven()
      ) : step === 8 ? (
        renderStepEight()
      ) : step === 9 ? (
        renderStepNine()
      ) : step === 10 ? (
        renderStepTen()
      ) : step === 11 ? (
        renderStepEleven()
      ) : null}
    </form>
  );
}
export default PrestataireRegister;
