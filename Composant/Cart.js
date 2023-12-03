import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import useCartStore from './CartStore';

const Cart = () => {
    const cartStore = useCartStore();
    const cartItems = Object.values(cartStore.cartItems);

    const getTotalPrice = () => {
        let total = 0;
        Object.keys(cartStore.cartItems).forEach((itemName) => {
            const item = cartStore.cartItems[itemName];
            const price = parseFloat(item.item.price);
            const quantity = parseInt(item.quantity, 10);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });
        return total;
    };
    const handleDecrement = (item) => {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity <= 0) {
            cartStore.deleteItem(item.item.name);
        } else {
            cartStore.decrementAmount(item.item.name);
        }
    };

    const handleIncrement = (item) => {
        cartStore.incrementAmount(item.item.name);
    };

    const handleRemoveItem = (item) => {
        cartStore.deleteItem(item.item.name);
    };

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.item.name}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text style={styles.cartItemName}>{item.item.name}</Text>
                            <Image source={{ uri: item.item.img }} style={styles.modalItemImage} />
                            <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.cartItemPrice}>Price: {item.item.price}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleDecrement(item)}
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityValue}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => handleIncrement(item)}
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.removeItemButton}
                                onPress={() => handleRemoveItem(item)}
                            >
                                <Text style={styles.removeItemButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <Text style={styles.totalPriceText}>Total Price: {getTotalPrice()} €</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E5E7E6',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
    },
    cartItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemQuantity: {
        fontSize: 16,
    },
    cartItemPrice: {
        fontSize: 16,
    },
    modalItemImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    quantityButton: {
        backgroundColor: '#7DC3A5',
        borderRadius: 20,
        margin: 8,
        padding: 8,
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    quantityValue: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    removeItemButton: {
        backgroundColor: '#E75C38',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    removeItemButtonText: {
        color: 'white',
        fontSize: 16,
        alignItems:'center',
        marginLeft: '40%',
    },
    totalPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    checkoutButton: {
        backgroundColor: '#7DC3A5',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Cart;
