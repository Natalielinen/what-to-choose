import './App.css';
import Main from './components/Main';
import { movies } from './data/movies';
import RegisterPage from './components/RegisterPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import PasswordRecoveryPage from './components/PasswordRecoveryPage';
import LinkSentPage from './components/LinkSentPage';
import Settings from './components/Settings';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

initializeApp(firebaseConfig);

function App () {
    const user1 = {
        userName: 'Natalie',
        userEmail: 'natalie@example.com',
        userMovies: movies
    };

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Perform Firebase Authentication here to check if the user is logged in.
        // If not, you can redirect to the registration or login page.
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('register');
        }
    }, [user]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="recovery" element={<PasswordRecoveryPage/>}/>
                <Route path="linkSent" element={<LinkSentPage/>}/>
                <Route path="settings" element={<Settings/>}/>
            </Routes>
        </>
    );
}

export default App;
