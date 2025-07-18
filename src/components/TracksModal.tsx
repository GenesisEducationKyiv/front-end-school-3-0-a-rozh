import React, { lazy, type ReactElement, Suspense, useState } from 'react';

import TrackForm from '../components/TrackForm';

import { type Genres } from '../types/apiSchemas';
import Spinner from './Spinner';

const Modal = lazy(() => import('../components/Modal'));

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
            {isOpen && (
                <Suspense fallback={<Spinner />}>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <TrackForm onClose={() => setIsOpen(false)} slug={slug} />
                    </Modal>
                </Suspense>
            )}
        </>
    );
}
