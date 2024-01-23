
'use client';

import { Button, Modal, Label, Select, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const UserEditModal = ({userData, onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState(userData);   
    const nameInputRef = useRef();

    const resetModal = () => {
        setOpenModal(false);
        setValues('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const editUser = () => {
        onCloseModal(values);
        resetModal();
    };

    const roles = ['ROLE_ADMIN', 'ROLE_PRESTATAIRE', 'ROLE_USER'];

    return (
        <>
            <Button className="sx: mb-2" color="gray" onClick={() => setOpenModal(true)}>
                Editer
            </Button>
            <Modal show={openModal} onClose={resetModal} initialFocus={nameInputRef}>
                <Modal.Header>Editer utilisateur: {userData.nom} {userData.prenom} </Modal.Header>
                <form onSubmit={(event) => {event.preventDefault(); editUser(); }}>
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
                            // multiple={true}
                            required
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                {role}
                                </option>
                            ))}
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

UserEditModal.propTypes = {
    userData: PropTypes.object,
    onCloseModal: PropTypes.func,
};

export default UserEditModal;
