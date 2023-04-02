import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import PlacesPage from './Pages/PlacesPage';
import PlaceDisplay from './Pages/PlaceDisplay';
import PlaceFormPage from './Pages/PlacesFormPage';
import { UserContextProvider } from './UserContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceFormPage />} />
          <Route path="/account/places/:id" element={<PlaceFormPage />} />
          <Route path="/places/:id" element={<PlaceDisplay />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
export default App;
