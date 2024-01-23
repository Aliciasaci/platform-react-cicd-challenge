
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const UserDeleteModal = ({userName, onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState(userName);

    const resetModal = () => {
        setOpenModal(false);
        setName('');
    };

    const deleteUser = () => {
        onCloseModal(name);
        resetModal();
    };

    return (
        <>
            <Button className="sx: mb-2" color="failure" onClick={() => setOpenModal(true)}>
                Supprimer
            </Button>
            <Modal show={openModal} onClose={resetModal}>
            <form onSubmit={(event) => {event.preventDefault(); deleteUser(); }}>   
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Êtes-vous sûr de vouloir supprimer utilisateur <span className="font-bold">{userName}</span> ?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" type="submit">
                        Oui, supprimer
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Non, annuler
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </form>
            </Modal>
        </>
    );
};

UserDeleteModal.propTypes = {
    userName: PropTypes.string,
    onCloseModal: PropTypes.func,
};

export default UserDeleteModal;
