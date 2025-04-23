import { create } from 'zustand'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase' // Asegúrate que estos estén correctamente importados

export const CartStore = create((set, get) => ({
  cart: [],

  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }))
  },

  decreaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }))
  },

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id)
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        }
      }
    })
  },

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  saveCartToFirestore: async () => {
    const user = auth.currentUser
    const cart = get().cart
    if (user) {
      const docRef = doc(db, 'carritos', user.uid)
      await setDoc(docRef, { cart }, { merge: true })
      console.log('Carrito guardado exitosamente')
    }
  },

  loadCartFromFirestore: async () => {
    const user = auth.currentUser
    if (user) {
      const docRef = doc(db, 'carritos', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists() && docSnap.data().cart) {
        set({ cart: docSnap.data().cart })
        console.log('Carrito cargado desde Firestore')
      }
    }
  },
}))


export default CartStore