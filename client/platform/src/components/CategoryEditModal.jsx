
'use client';

import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const CategoryEditModal = ({categoryName, onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState(categoryName);
    const nameInputRef = useRef();

    const resetModal = () => {
        setOpenModal(false);
        setName('');
    };

    const editCategory = () => {
        onCloseModal(name);
        resetModal();
    };

    return (
        <>
            <Button className="sx: mb-2" color="gray" onClick={() => setOpenModal(true)}>
                Editer
            </Button>
            <Modal show={openModal} onClose={resetModal} initialFocus={nameInputRef}>
                <Modal.Header>Editer category: {categoryName}</Modal.Header>
                <form onSubmit={(event) => {event.preventDefault(); editCategory(); }}>
                    <Modal.Body>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Nom" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            ref={nameInputRef}
                            placeholder="Entre le nouveau nom de la catégorie"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
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

CategoryEditModal.propTypes = {
    categoryName: PropTypes.string,
    onCloseModal: PropTypes.func,
};

export default CategoryEditModal;
