
'use client';

import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const CategoryModal = ({onCloseModal}) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const nameInputRef = useRef();

    const resetModal = () => {
        setOpenModal(false);
        setName('');
    };

    const createCategory = () => {
        onCloseModal(name);
        resetModal();
    };

    return (
        <>
            <Button className="sx: mb-2" color="dark" onClick={() => setOpenModal(true)}>
                Ajouter
            </Button>
            <Modal show={openModal} onClose={resetModal} initialFocus={nameInputRef}>
                <Modal.Header>Ajouter une catégorie</Modal.Header>
                <form onSubmit={(event) => {event.preventDefault(); createCategory(); }}>
                    <Modal.Body>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Nom" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            ref={nameInputRef}
                            placeholder="Entre le nom de la catégorie"
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

CategoryModal.propTypes = {
    isEdit: PropTypes.bool,
    onCloseModal: PropTypes.func,
};

export default CategoryModal;
