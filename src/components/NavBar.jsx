import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">
        <Link to="/">MiEcommerce</Link>
      </h1>
      <ul className="flex gap-6 text-gray-700 font-medium items-center">
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
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
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