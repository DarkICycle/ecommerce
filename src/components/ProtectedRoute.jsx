import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase' // Asegúrate de importar correctamente

const ProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setIsAdmin(docSnap.data().isAdmin === true)
        } else {
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div className="text-center mt-10">Cargando...</div>

  if (!isAdmin) return <Navigate to="/" />

  return children
}

export default ProtectedRoute
