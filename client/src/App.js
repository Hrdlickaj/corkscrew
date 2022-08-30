import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import WineListPage from './Pages/WineListPage';
import NewWinePage from './Pages/NewWinePage';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/EditProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch('/me').then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  function whenAddWine(newWine) {
    const expandedWinesArray = [...wines, newWine];
    setWines(expandedWinesArray);
  }

  if (!user)
    return (
      <>
        <Routes>
          <Route path='/' element={<LoginPage onLogin={setUser} />} />
          <Route path='/signup' element={<SignupPage onSignup={setUser} />} />
        </Routes>
      </>
    );

  return (
    <div className='App'>
      <NavigationBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/my_wines' element={<WineListPage user={user} />} />
        <Route
          path='/new_wine'
          element={<NewWinePage handleAddWine={whenAddWine} user={user} />}
        />
        <Route path='/profile' element={<ProfilePage user={user} />} />
        <Route path='/edit_profile' element={<EditProfilePage user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
