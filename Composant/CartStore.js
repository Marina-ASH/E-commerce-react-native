import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCartStore = create(
    persist(
        (set) => ({
            cartItems: {},
            addToCart: (item, quantity) => {
                set((state) => {
                    const updatedCartItems = { ...state.cartItems };
                    if (updatedCartItems[item.name]) {
                        updatedCartItems[item.name].quantity += quantity;
                    } else {
                        updatedCartItems[item.name] = {
                            item,
                            quantity,
                        };
                    }
                    return { cartItems: updatedCartItems };
                });
            },
            getCartItems: () => {
                AsyncStorage.getItem('cartItems').then((data) => {
                    if (data) {
                        set({ cartItems: JSON.parse(data) });
                    }
                });
            },
            updateCartItems: (cartItems) => {
                try {
                    const cartItemsString = JSON.stringify(cartItems);
                    AsyncStorage.setItem('cartItems', cartItemsString);
                    set({ cartItems });
                } catch (error) {
                    console.error("Erreur lors de la sérialisation des données : ", error);
                }
            },

            deleteItem: (itemName) => {
                set((state) => {
                    const updatedCartItems = { ...state.cartItems };
                    if (updatedCartItems[itemName]) {
                        delete updatedCartItems[itemName];
                        return { cartItems: updatedCartItems };
                    }
                    return null;
                });
            },
            incrementAmount: (itemName) => {
                set((state) => {
                    const updatedCartItems = { ...state.cartItems };
                    if (updatedCartItems[itemName]) {
                        updatedCartItems[itemName].quantity += 1;
                        return { cartItems: updatedCartItems };
                    }
                });
            },
            decrementAmount: (itemName) => {
                set((state) => {
                    const updatedCartItems = { ...state.cartItems };
                    if (updatedCartItems[itemName] && updatedCartItems[itemName].quantity > 1) {
                        updatedCartItems[itemName].quantity -= 1;
                        return { cartItems: updatedCartItems };
                    }
                });
            },
        }),
        {
            name: "cart-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCartStore;
