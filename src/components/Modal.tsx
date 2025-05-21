import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    document.body.style.overflow = 'hidden';

    if (!isOpen) {
        document.body.style.overflow = 'auto';
        return null;
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-center bg-slate-900/70"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative p-4  max-w-2xl max-h-full">
                <div className="overflow-hidden relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-400   rounded-lg text-sm w-8 h-8 flex items-center justify-center hover:bg-gray-600 hover:text-white"
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
