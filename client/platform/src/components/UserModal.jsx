
'use client';

import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const initialValues = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    roles: '',
}
const UserModal = ({onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState(initialValues);

    const nameInputRef = useRef();

    const resetModal = () => {
        setOpenModal(false);
        setValues(initialValues);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const createUser = () => {
        onCloseModal(values);
        resetModal();
    };

    return (
        <>
            <Button className="sx: mb-2" color="dark" onClick={() => setOpenModal(true)}>
                Ajouter
            </Button>
            <Modal show={openModal} onClose={resetModal} initialFocus={nameInputRef}>
                <Modal.Header>Ajouter un utilisateur</Modal.Header>
                <form onSubmit={(event) => {event.preventDefault(); createUser(); }}>
                    <Modal.Body>
                        <div className="mb-2 block">
                            <Label htmlFor="nom" value="Nom" />
                        </div>
                        <TextInput
                            id="nom"
                            name="nom"
                            ref={nameInputRef}
                            placeholder="Nom"
                            value={values.nom}
                            onChange={handleChange}
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="prenom" value="Prénom" />
                        </div>
                        <TextInput
                            id="prenom"
                            name="prenom"
                            placeholder="Prénom"
                            value={values.prenom}
                            onChange={handleChange}
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Mot de passe" />
                        </div>
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />  
                        <div className="mb-2 block">
                            <Label htmlFor="role" value="Rôle" />
                        </div>
                        <Select
                            id="role"
                            name="roles"        
                            value={values.roles}
                            onChange={handleChange}
                            required
                        >
                        <option defaultValue>Sélectionner un rôle</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        <option value="ROLE_PRESTATAIRE">ROLE_PRESTATAIRE</option>
                        <option value="ROLE_USER">ROLE_USER</option>
                        </Select>  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="dark" type="submit">Valider</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Annuler
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

UserModal.propTypes = {
    isEdit: PropTypes.bool,
    onCloseModal: PropTypes.func,
};

export default UserModal;
