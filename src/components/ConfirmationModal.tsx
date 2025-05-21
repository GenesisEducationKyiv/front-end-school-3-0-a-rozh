import React, { type ReactElement, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

import Modal from '../components/Modal';

interface ConfirmationModalProps {
    trigger: ReactElement;
    text: string;
    onConfirm: () => void;
}

export default function ConfirmationModal({
    trigger,
    text,
    onConfirm,
}: ConfirmationModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const triggerWithHandler = React.cloneElement(trigger, {
        onClick: () => setIsOpen(true),
    });

    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };
    return (
        <>
            {triggerWithHandler}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div
                    className="w-90 p-5 pt-9 bg-gray-800 text-slate-200 flex flex-col gap-5"
                    data-testid="confirm-dialog"
                >
                    <div className="flex items-center gap-3">
                        <div className="text-3xl">
                            <HiOutlineExclamationCircle />
                        </div>
                        <span>{text}</span>
                    </div>
                    <div className="flex justify-evenly">
                        <button
                            onClick={handleConfirm}
                            className="px-9 py-3 rounded-sm bg-teal-700 hover:bg-teal-800 cursor-pointer"
                            data-testid="confirm-delete"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-9 py-3 rounded-sm bg-red-500 hover:bg-red-400 cursor-pointer"
                            data-testid="cancel-delete"
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
