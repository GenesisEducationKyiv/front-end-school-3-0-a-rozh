import React, { type ReactElement, useState } from 'react';

import Modal from '../components/Modal';
import TrackForm from '../components/TrackForm';

import { type Genres } from '../types/apiSchemas';

interface TracksModalProps {
    trigger: ReactElement;
    slug?: string;
    genres?: Genres;
}

export default function TracksModal({ trigger, slug }: TracksModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const triggerWithHandler = React.cloneElement(trigger, {
        onClick: () => setIsOpen(true),
    });
    return (
        <>
            {triggerWithHandler}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <TrackForm onClose={() => setIsOpen(false)} slug={slug} />
            </Modal>
        </>
    );
}
