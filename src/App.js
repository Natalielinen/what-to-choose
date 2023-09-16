import './App.css';
import Main from './components/Main';
import { movies } from './data/movies';
import RegisterPage from './components/RegisterPage';

function App () {
   /* const user = {
        userName: "Natalie",
        userEmail: "natalie@example.com",
        userMovies: movies
    }*/

    const user = null;

    return (
        <>
            {
                user ? <Main /> : <RegisterPage />
            }
        </>
    );
}

export default App;
