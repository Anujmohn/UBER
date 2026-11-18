import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import { UserLogout } from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';

const App = () => {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Start />} />
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/UserSignup" element={<UserSignup />} />
                <Route path="/CaptainLogin" element={<CaptainLogin />} />
                <Route path="/CaptainSignup" element={<CaptainSignup />} />
                <Route path="/CaptainHome" element={
                    <CaptainProtectWrapper>
                        <CaptainHome />
                    </CaptainProtectWrapper>
                } />
                <Route path="/captain/logout" element={
                    <CaptainProtectWrapper>
                        <CaptainLogout />
                    </CaptainProtectWrapper>
                } />
                <Route path="/Home" element={
                    <UserProtectedWrapper>
                        {<Home/>}
                    </UserProtectedWrapper>
                } />

                <Route path="/user/logout" element={
                    <UserProtectedWrapper>
                        {<UserLogout/>}
                    </UserProtectedWrapper>
                } />

            </Routes>
        </div>
    );
}

export default App