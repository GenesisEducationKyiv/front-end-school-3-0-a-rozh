import { Toaster, ToastBar } from 'react-hot-toast';

export default function CustomToaster() {
    return (
        <Toaster
            toastOptions={{
                success: {
                    duration: 3000,
                    style: {
                        backgroundColor: 'oklch(51.1% 0.096 186.391)',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '16px 24px',
                        maxWidth: '500px',
                    },
                    iconTheme: {
                        primary: 'oklch(85.5% 0.138 181.071)',
                        secondary: 'oklch(39.3% 0.095 152.535)',
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        backgroundColor: 'oklch(70.4% 0.191 22.216)',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '16px 24px',
                        maxWidth: '500px',
                    },
                    iconTheme: {
                        primary: 'oklch(55.3% 0.195 38.402)',
                        secondary: 'oklch(39.6% 0.141 25.723)',
                    },
                },
            }}
        >
            {(toast) => (
                <div data-testid="toast-container">
                    <div data-testid={`toast-${toast.type}`}>
                        <ToastBar toast={toast} />
                    </div>
                </div>
            )}
        </Toaster>
    );
}
