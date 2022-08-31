import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import WineListPage from './Pages/WineListPage';
import NewWinePage from './Pages/NewWinePage';
import MapPage from './Pages/MapPage';
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

  useEffect(() => {
    fetch('http://localhost:4000/wines')
      .then((r) => r.json())
      .then((winesData) => {
        setWines(winesData);
      });
  }, []);

  function whenAddWine(newWine) {
    const expandedWinesArray = [...wines, newWine];
    setWines(expandedWinesArray);
  }

  const [searchTerm, setSearchTerm] = useState('');

  const displayedWines = wines.filter((wine) => {
    return (
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.grape.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function whenEditWine(updatedWine) {
    const updatedWinesArray = wines.map((wine) => {
      if (wine.id === updatedWine.id) {
        return updatedWine;
      } else {
        return wine;
      }
    });
    setWines(updatedWinesArray);
  }

  function whenDeleteWine(id) {
    const reducedWinesArray = wines.filter((wine) => wine.id !== id);
    setWines(reducedWinesArray);
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
        <Route
          path='/my_wines'
          element={
            <WineListPage
              user={user}
              wines={wines}
              handleDeleteWine={whenDeleteWine}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              handleUpdateWine={whenEditWine}
            />
          }
        />
        <Route
          path='/new_wine'
          element={<NewWinePage handleAddWine={whenAddWine} user={user} />}
        />
        <Route path='/map' element={<MapPage />} />
        <Route path='/profile' element={<ProfilePage user={user} />} />
        <Route path='/edit_profile' element={<EditProfilePage user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
