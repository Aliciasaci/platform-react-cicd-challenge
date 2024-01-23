'use client';

import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';

const DeleteCategoryModal = ({onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);

    const resetModal = () => {
        setOpenModal(false);
    };

    const deleteCategory = () => {
        onCloseModal(id);
        resetModal();
    };
    return (
        <>
            <Modal show={openModal} size="md" onClose={resetModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={(event) => {event.preventDefault(); deleteCategory();}}>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Etes vous sûr de vouloir supprimer cette catégorie ?
                            </h3>
                            <div className="flex justify-center gap-4">
                            <Button type="submit" color="failure" onClick={() => setOpenModal(false)}>
                                {"Oui, supprimer"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Non, annuler
                            </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

DeleteCategoryModal.propTypes = {
    onCloseModal: PropTypes.func,
};
export default DeleteCategoryModal;