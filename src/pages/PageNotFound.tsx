import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    function handleBack() {
        const canGoBack = window.history.state?.idx > 0;

        if (canGoBack) {
            navigate(-1);
        } else {
            navigate('/', { replace: true });
        }
    }

    return (
        <div className="bg-slate-400 text-slate-700 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-3 text-center text-3xl">
                <p className="font-bold">404</p>
                <p className="font-semibold">Nothing here</p>
                <button
                    className="bg-slate-800 rounded text-slate-300 py-1 mt-3"
                    onClick={handleBack}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
