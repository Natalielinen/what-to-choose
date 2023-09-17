import './App.css';
import Main from './components/Main';
import { movies } from './data/movies';
import RegisterPage from './components/RegisterPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';

function App () {
    const user1 = {
        userName: 'Natalie',
        userEmail: 'natalie@example.com',
        userMovies: movies
    };

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

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
            </Routes>
        </>
    );
}

export default App;
