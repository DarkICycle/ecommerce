import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import exitIcon from '../assets/exit.png';


function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin === true);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 sm:px-8 py-4 flex justify-between items-center rounded-b-2xl relative z-10">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
        <Link to="/">MiEcommerce</Link>
      </h1>

      {/* Botón hamburguesa - solo visible en móvil */}
      <button
        className="sm:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Enlaces */}
      <ul
        className={`sm:flex gap-6 text-gray-700 font-medium items-center transition-all duration-300
          ${menuOpen ? 'absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg py-4 flex flex-col items-center z-20' : 'hidden'}
          sm:static sm:flex-row sm:bg-transparent sm:py-0`}
      >
        <li>
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
        </li>
        <li>
          <Link to="/productos" className="hover:text-blue-600">Productos</Link>
        </li>

        {isAdmin && (
          <li>
            <Link
              to="/crud"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Panel
            </Link>
          </li>
        )}

        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition"
            >
              <img
                src={exitIcon}
                alt="Cerrar sesión"
                className="w-6 h-6 object-contain"
              />
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
