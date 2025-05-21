import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import Tracks from './pages/Tracks';
import CustomToaster from './components/CustomToaster';
import PageNotFound from './pages/PageNotFound';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Navigate replace to="tracks" />} />
                    <Route path="tracks" element={<Tracks />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <CustomToaster />
        </Provider>
    );
}

export default App;
