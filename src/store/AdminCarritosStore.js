import { create } from 'zustand'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export const AdminCarritosStore = create((set) => ({
  userCarts: [],
  isAdmin: false,
  isLoading: true, // Agregado para manejar estado de carga

  fetchCarts: async () => {
    set({ isLoading: true })
    const user = auth.currentUser
  
    if (!user) {
      console.log('No hay usuario autenticado')
      set({ isAdmin: false, isLoading: false })
      return
    }
  
    console.log('UID actual:', user.uid)
  
    const userDocRef = doc(db, 'usuarios', user.uid)
    const userDoc = await getDoc(userDocRef)
  
    if (userDoc.exists()) {
      console.log('Documento del usuario:', userDoc.data())
  
      if (userDoc.data().isAdmin) {
        const querySnapshot = await getDocs(collection(db, 'carritos'))
        const carts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        set({ userCarts: carts, isAdmin: true, isLoading: false })
        return
      }
    } else {
      console.log('Documento del usuario no existe')
    }
  
    set({ isAdmin: false, isLoading: false })
  }
  ,
}))
