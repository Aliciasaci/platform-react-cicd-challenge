import { useState, useMemo, useEffect } from 'react';
import { Button, Progress, Label, TextInput, Checkbox, ToggleSwitch,FileInput } from 'flowbite-react';
import { FaArrowLeft, FaArrowRight, FaRegEye, FaRegEyeSlash, FaPlus } from "react-icons/fa6";
import * as EmailValidator from 'email-validator';
import MapFinder from '../components/MapFinder';
import TimeRangePicker from '../components/TimeRangePicker';
import PrestationCreateModal from '../components/PrestationCreate';

function PrestataireRegister() {
    const [step, setStep] = useState(1);
    const [createModal, setCreateModal] = useState(false);
    const [nameError, setNameError] = useState('');
    const [salonNameError, setSalonNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isMailExisted, setMailExist] = useState(false);
    const [jobCategories, setJobCategories] = useState([]);
    const SERVER_ENDPOINT = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;
    const [passwordSafety, setPasswordSafety] = useState(0);
    const [formData, setFormData] = useState({
        prestataire: {
            nom: '',
            prenom: '',
            plainPassword: '',
            email: '',
        },
        nom: '',
        password: '',
        adresse: '',
        ville: '',
        codePostal: '',
        pays: '',
        latitude: '',
        longitude: '',
        kbis: null,
        categories: [],
        companySize: '',
        horairesouverture: {
            lundi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            mardi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            mercredi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            jeudi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            vendredi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            samedi: { checked: false, timeRange: { startTime: '', endTime: '' } },
            dimanche: { checked: false, timeRange: { startTime: '', endTime: '' } },
        },
        prestations: [],
    });
    const [lundiChecked, setLundiChecked] = useState(false);
    const [mardiChecked, setMardiChecked] = useState(false);
    const [mercrediChecked, setMercrediChecked] = useState(false);
    const [jeudiChecked, setJeudiChecked] = useState(false);
    const [vendrediChecked, setVendrediChecked] = useState(false);
    const [samediChecked, setSamediChecked] = useState(false);
    const [dimancheChecked, setDimancheChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                lundi: {
                    ...prevData.horairesouverture.lundi,
                    checked: lundiChecked,
                    timeRange:  
                        (prevData.horairesouverture.lundi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.lundi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [lundiChecked]);     

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                mardi: {
                    ...prevData.horairesouverture.mardi,
                    checked: mardiChecked,
                    timeRange:
                        (prevData.horairesouverture.mardi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.mardi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [mardiChecked]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                mercredi: {
                    ...prevData.horairesouverture.mercredi,
                    checked: mercrediChecked,
                    timeRange:
                        (prevData.horairesouverture.mercredi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.mercredi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [mercrediChecked]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                jeudi: {
                    ...prevData.horairesouverture.jeudi,
                    checked: jeudiChecked,
                    timeRange:
                        (prevData.horairesouverture.jeudi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.jeudi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [jeudiChecked]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                vendredi: {
                    ...prevData.horairesouverture.vendredi,
                    checked: vendrediChecked,
                    timeRange:
                        (prevData.horairesouverture.vendredi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.vendredi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [vendrediChecked]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                samedi: {
                    ...prevData.horairesouverture.samedi,
                    checked: samediChecked,
                    timeRange: 
                        (prevData.horairesouverture.samedi.timeRange.startTime !== '' 
                            ? prevData.horairesouverture.samedi.timeRange 
                            : { startTime: '09:00', endTime: '19:00' }) 
                },
            },
        }));
    }, [samediChecked]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            horairesouverture: {
                ...prevData.horairesouverture,
                dimanche: {
                    ...prevData.horairesouverture.dimanche,
                    checked: dimancheChecked,
                    timeRange: 
                        (prevData.horairesouverture.dimanche.timeRange.startTime !== ''
                            ? prevData.horairesouverture.dimanche.timeRange 
                            : { startTime: '09:00', endTime: '19:00' })
                },
            },
        }));
    }, [dimancheChecked]);

    useEffect(() => {
        const parts = selectedAddress.split(',');
        if (parts.length > 1) {
            const secondPart = parts[1].trim(); // "45000 Orléans"
            const thirdPart = parts[2].trim();
            const [code, ...cityParts] = secondPart.split(' ');
            setFormData({ ...formData, adresse: parts[0], codePostal: code, ville: cityParts.join(' ').trim(), pays: thirdPart });
        } else {
            setFormData({ ...formData, adresse: '', codePostal: '', ville: '', pays: '' });
        }
    }, [selectedAddress]);
    const MAX_STEP = 11;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddressChange = (newAddress) => {
        setSelectedAddress(newAddress.formatted_address);
        setFormData({ ...formData, latitude: newAddress.lat, longitude: newAddress.lng });
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
            setFormData({ ...formData, categories: formData.categories.filter((category) => category !== idIri) });
        }
    };


    const handleTimeRangeChange = (timeRange, day) => {
        setFormData({
            ...formData,
            horairesouverture: {
                ...formData.horairesouverture,
                [day]: {
                    ...formData.horairesouverture[day],
                    timeRange: timeRange,
                },
            },
        });
    };

    const checkStepThree = () => {
        const isValidSalonName = formData.nom !== '';
        const isValidPrestataireName = formData.prestataire.nom !== '';
        const isValidPrestatairePrename = formData.prestataire.prenom !== '';
    
        // Initialize error messages
        let newNameError = '';
        let newSalonNameError = '';

        if (isValidPrestataireName && isValidPrestatairePrename && isValidSalonName ) {
            console.log('here');
            return true;
        } else {
            if (!isValidPrestataireName) {
                newNameError = 'Prestataire last name is required ';
            } 
            if (!isValidPrestatairePrename) {
                newNameError += 'Prestataire first name is required ';
            }
            if (!isValidSalonName) {
                newSalonNameError = 'Salon name is required';
            }
    
            // Set the error states at once
            setNameError(newNameError);
            setSalonNameError(newSalonNameError);
            return false;
        }
    }

    const checkStepFour = () => {
        const hasMinLength = formData.prestataire.plainPassword.length >= 8;
        const hasUpperCase = /[A-Z]/.test(formData.prestataire.plainPassword);
        const hasLowerCase = /[a-z]/.test(formData.prestataire.plainPassword);
        const hasNumbers = /\d/.test(formData.prestataire.plainPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.prestataire.plainPassword);
    
        let errorMessage = '';
    
        if (!hasMinLength) {
            errorMessage += 'Password must be at least 8 characters long. ';
        }
        if (!hasUpperCase) {
            errorMessage += 'Password must contain at least one uppercase letter. ';
        }
        if (!hasLowerCase) {
            errorMessage += 'Password must contain at least one lowercase letter. ';
        }
        if (!hasNumbers) {
            errorMessage += 'Password must contain at least one number. ';
        }
        if (!hasSpecialChar) {
            errorMessage += 'Password must contain at least one special character. ';
        }
    
        if (errorMessage === '') {
            return true;
        } else {
            setPasswordError(errorMessage.trim());
            return false;
        }   
    }

    const nextStep = () => {
        if (step === 3) {
            if (!checkStepThree()) {
                return;
            }
        }

        if (step === 4) {
            if (!checkStepFour()) {
                return;
            }
        }

        if (step >= 11)
            console.log(formData);

        setStep(step + 1);
    };

    const prevStep = () => {
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

    const handleCloseCreatePrestation = () => {
        setCreateModal(false);
    }

    const handleSubmitCreatePrestation = (prestationInfo) => {
        let prestation = {
            titre: prestationInfo.name,
            prix: prestationInfo.price,
            duree: parseInt(prestationInfo.durationHours) * 60 + parseInt(prestationInfo.durationMinutes) + '',
        };
        setFormData({ ...formData, prestations: [...formData.prestations, prestation] });
        setCreateModal(false);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${SERVER_ENDPOINT}/categories`); // Replace with the actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const categories = data['hydra:member'];
            let categoriesArray = [];
            categories.forEach(category => {
                categoriesArray.push({ [category.id]: category.name });
            });
            setJobCategories(categoriesArray);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetEmail = () => {
        setFormData({
            ...formData,
            prestataire: {
                ...formData.prestataire,
                email: " " 
            }
        });
        setStep(1);
    }

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFormData({ ...formData, kbis: event.target.files[0] });
        }
    };

    const checkMailExist = async () => {
        try {
            const response = await fetch(`${SERVER_ENDPOINT}/users?email=${formData.prestataire.email}`); // Replace with the actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const users = data['hydra:member'];
            if (users.length > 0) {
                setMailExist(true);
            }
        } catch (error) {
            console.error('Error:', error);
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
        if (step === 4) {
            fetchCategories();
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
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-white' disabled={true} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-10 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-4/5 font-bold' value="Quelle est votre adresse email ?" />
                            </div>
                            <TextInput id="base" type="text" placeholder="Adresse email" sizing="md" name="email" onChange={setEmail} value={formData.prestataire.email} />
                        </div>
                        <Button className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" disabled={!isEmailValid} onClick={nextStep}>
                            Continuer
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const renderStepTwo = () => {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-gray-200">
                <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-full font-bold' value="Configurez votre profil PickMe" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Il semble que vous soyez nouveau ici. Laissez-nous vous guider lors de l&apos;installation de votre PickMe.
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
                                Démarrer l&apos;installation
                            </Button>
                        </div>
                        <div className='flex mt-10 justify-center'>
                            <p onClick={() => resetEmail()} className="text-center hover:underline w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                Essayez un email autre que {formData.prestataire.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderStepThree = () => {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-gray-200">
                <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-full font-bold' value="À propos de vous" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Parlez-nous plus en détail de vous et de votre entreprise.
                                </p>
                            </div>
                            {
                                salonNameError !== '' &&
                                <div className='flex mb-1 justify-center'>
                                    <p className="text-center w-4/5 text-sm font-normal text-red-500">
                                        {salonNameError}
                                    </p>
                                </div>
                            }
                            <TextInput className='mb-4' id="base" type="text" placeholder="Nom du salon" sizing="md" name="nom" onChange={onChange} value={formData.nom} />
                            {
                                nameError !== '' &&
                                <div className='flex mb-1 justify-center'>
                                    <p className="text-center w-4/5 text-sm font-normal text-red-500">
                                        {nameError}
                                    </p>
                                </div>
                            }
                            <div className='flex mb-4 justify-between'>
                                <TextInput id="base" type="text" placeholder="Nom" sizing="md" name="prestataire.nom" onChange={setNom} value={formData.prestataire.nom} />
                                <TextInput id="base" type="text" placeholder="Prénom" sizing="md" name="prestataire.prenom" onChange={setPrenom} value={formData.prestataire.prenom} />
                            </div>
                            <div>
                                <FileInput id="file-upload" helperText="Téléchargez votre Kbis" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
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
            <div className="flex justify-center items-center h-screen w-full bg-gray-200">
                <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-full font-bold' value="Configuration du mot de passe" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Entrer le mot de passe pour votre profil professionnel.
                                </p>
                            </div>
                            {
                                passwordError !== '' &&
                                <div className='flex mb-1 justify-center'>
                                    <p className="text-center w-4/5 text-sm font-normal text-red-500">
                                        {passwordError}
                                    </p>
                                </div>
                            }
                            <div className='flex mt-4 justify-center'>
                                <div className='flex'>
                                    <TextInput id="base" className='w-4/5' type={showPassword ? "text" : "password"} placeholder="Password" sizing="md" name="password" onChange={setPassword} value={formData.prestataire.plainPassword} />
                                    <Button className='bg-white hover:bg-blue-700 w-1/5' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ?
                                            <FaRegEyeSlash className='text-2xl text-black' />
                                            :
                                            <FaRegEye className='text-2xl text-black' />
                                        }
                                    </Button>
                                </div>
                            </div>
                            <div className='flex w-full mt-6 items-center justify-center px-2'>
                                <Progress className="w-80" progress={passwordSafety} color={passwordSafety < 33 ? "red" : (passwordSafety < 66 ? "yellow" : "green")} />
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <Button className="bg-black uppercase w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
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
                <div className=" flex justify-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className="bg-rent-a-gf bg-cover rounded-t-xl flex w-full h-52 items-start justify-start px-2">
                            <FaArrowLeft className='text-2xl mt-10 ml-10 text-white hover:text-blue-700' onClick={prevStep} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-4/5 font-bold' value="Où vos clients peuvent-ils vous trouver ?" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Parlez-nous davantage de votre travail afin que nous puissions envoyer vos clients au bon endroit.
                                </p>
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
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
                <div className=" flex justify-center items-center w-2/5 h-4/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <MapFinder onAddressSelect={handleAddressChange} />
                        </div>
                        <div className='flex w-full justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
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
                <div className="flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-6 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-2xl text-center w-full font-bold' value="Votre adresse" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Où le client peut-il vous trouver ?
                                </p>
                            </div>
                            <div className='mt-4'>
                                <TextInput id="adresse" className='w-full mb-2' placeholder="Adresse et numéro" sizing="md" name="adresse" onChange={onChange} value={formData.adresse} />
                                <TextInput id="ville" className='w-full mb-2' placeholder="Ville" sizing="md" name="ville" onChange={onChange} value={formData.ville} />
                                <TextInput id="postalCode" className='w-full mb-2' placeholder="Code Postal" sizing="md" name="codePostal" onChange={onChange} value={formData.codePostal} />
                                <TextInput id="pays" className='w-full' placeholder="Pays" sizing="md" name="pays" onChange={onChange} value={formData.pays}/>
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <div className='block w-full'>
                                <Button className="bg-black uppercase w-full mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
                                    Continuer
                                </Button>
                                <Button className="bg-white uppercase w-full hover:bg-blue-700 text-red-600 border-slate-600 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={prevStep}>
                                    Réinitialiser
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
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group mt-10 mb-10">
                            <div className="mb-2 flex justify-center">
                                <Label htmlFor="base" className='text-3xl text-center w-full font-bold' value="Vos heures d'ouverture" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Quand les clients peuvent-ils effectuer une réservation chez vous ?
                                </p>
                            </div>
                            <div className='flex mt-4 w-full justify-center items-center divide-y'>
                                <div className='w-full'>
                                    <div className='w-full mb-2 mt-4 max-w-md flex-col'>
                                        <div className="flex mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={lundiChecked} label="Lundi" onChange={setLundiChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={lundiChecked} day="lundi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={mardiChecked} label="Mardi" onChange={setMardiChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={mardiChecked} day="mardi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={mercrediChecked} label="Mercredi" onChange={setMercrediChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={mercrediChecked} day="mercredi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={jeudiChecked} label="Jeudi" onChange={setJeudiChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={jeudiChecked} day="jeudi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={vendrediChecked} label="Vendredi" onChange={setVendrediChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={vendrediChecked} day="vendredi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={samediChecked} label="Samedi" onChange={setSamediChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={samediChecked} day="samedi" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-3">
                                            <ToggleSwitch className='w-32 no-padding-btn' checked={dimancheChecked} label="Dimanche" onChange={setDimancheChecked} />
                                            <div className='flex w-4/5 max-w-xs justify-center'>
                                                <TimeRangePicker show={dimancheChecked} day="dimanche" onTimeRangeChange={(timeRange, day) => handleTimeRangeChange(timeRange, day)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full mt-4 justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
                                Continuer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const renderStepNine = () => {
        return (
            <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
                <div className=" flex justify-center items-center w-2/5 h-3/5 bg-white rounded-xl">
                    <div>
                        <div className='flex w-full items-center justify-center px-2'>
                            <FaArrowLeft className='text-2xl text-black hover:text-blue-700' onClick={prevStep} />
                            <Progress className="w-48 min-w-full ml-4 mr-8 pr-6" progress={step / MAX_STEP * 100} color="green" />
                            <FaArrowRight className='text-2xl ml-8 text-white' disabled={true} />
                        </div>
                        <div className="form-group justify-center mt-10 mb-10">
                            <div className="mb-2 w-full flex justify-center">
                                <Label htmlFor="base" className='text-3xl text-center w-3/5 font-bold' value="Commencer à ajouter des prestations" />
                            </div>
                            <div className='flex justify-center'>
                                <p className="text-center w-4/5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Ajouter au moins une prestation maintenant. Plus tard, vous pourrez en ajouter d&apos;autres, modifier les informations, et regrouper les prestations en catégories.
                                </p>
                            </div>
                            <div className='block mt-4 w-full justify-center items-center'>
                                <div className='w-full block mt-3 justify-center'>
                                    {formData.prestations.length > 0 &&
                                        <div className='w-full flex justify-center'>
                                            <div className='block w-4/5'>
                                                {formData.prestations.map((prestation, index) => (
                                                    <div key={index} className='flex w-full justify-around items-center'>
                                                        <Label className='text-lg text-center w-1/4' value={`Nom: ${prestation.titre}`} />
                                                        <div className='flex gap-1 justify-center w-1/4'>
                                                            <Label className='text-sm text-center' value={`${prestation.duree} Minute(s)`} />
                                                        </div>
                                                        <Label className='text-sm text-center w-1/4' value={`${prestation.prix}€`} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    <div className='w-full flex mt-3 justify-center'>
                                        <Button color="gray" onClick={() => setCreateModal(true)}>
                                            <FaPlus className="mr-2 h-5 w-5" />
                                            Ajouter une prestation
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full mt-4 justify-center'>
                            <Button className="bg-black uppercase w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={nextStep}>
                                Continuer
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form className='w-screen flex justify-center items-center h-screen' onSubmit={onSubmit}>
            {
                createModal
                    ? <PrestationCreateModal onClose={handleCloseCreatePrestation} onSubmitPrestation={handleSubmitCreatePrestation} />
                    : step === 1
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
                                                    : step === 9
                                                        ? renderStepNine()
                                                        : null
            }
        </form>
    );
}
export default PrestataireRegister;
