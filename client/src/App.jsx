import IdCard from './components/idCard';
import Login from './components/login';
import Register from './components/register';
import Form from './components/form';
import Home from './components/admin/home';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Students from './components/admin/students';
import NewStudent from './components/admin/newStudent';
import Rejected from './components/admin/rejected';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        {/* Redirect root path based on authentication */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : user?.role === 'student' ? (
              !user?.Standarded || !user.address || !user.Dob ? (
                <Navigate to="/form" replace />
              ) : (
                <Navigate to="/profile" replace />
              )
            ) : user?.role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />
        <Route path="/signin" element={<Register />} />

        {/* Student Routes */}
        {isAuthenticated && user?.role === 'student' && (
          <>
            <Route path="/form" element={<Form />} />
            <Route path="/profile" element={<IdCard />} />
          </>
        )}

        {/* Admin Routes */}
        {isAuthenticated && user?.role === 'admin' && (
          <Route path="/admin" element={<Home />}>
            <Route index element={<Students />} /> {/* default */}
            <Route path="students" element={<Students />} />
            <Route path="new-student" element={<NewStudent />} />
            <Route path="Rejected-student" element={<Rejected />} />
          </Route>
        )}

        {/* Fallback route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
