import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import useCartStore from './CartStore';
import {dataItem} from '../Data/DataItem';

const Item = ({ item, navigation, searchValue, setSearchValue }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const cartStore = useCartStore();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        cartStore.addToCart(item, quantity);
        toggleModal();
    };

    useEffect(() => {
        cartStore.getCartItems();
    }, []);

    return (
        <View style={styles.item}>
            <Image source={{ uri: item.img }} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={toggleModal}
            >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: item.img }} style={styles.modalItemImage} />
                    <Text style={styles.modalItemName}>{item.name}</Text>
                    <Text style={styles.modalItemPrice}>{item.price}</Text>
                    <Text style={styles.modalItemDescription}>{item.description}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleDecrement}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleIncrement}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addToCartModalButton}
                        onPress={() => {
                            handleAddToCart();
                            Alert.alert('Your Item has been saved in the cart');
                        }}
                    >
                        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.goToCartButton}
                        onPress={() => {
                            navigation.navigate('Cart');
                        }}
                    >
                        <Text style={styles.goToCartButtonText}>Go to Cart</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default function ItemList({ navigation }) {
    const [searchValue, setSearchValue] = useState('');
    const filteredData = dataItem.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titreText}>Search</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setSearchValue(text)}
                    value={searchValue}
                    placeholder="Enter product name"
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <Item item={item} navigation={navigation} searchValue={searchValue} setSearchValue={setSearchValue} />
                )}
                keyExtractor={(item) => item.name}
                numColumns={2}
            />
        </View>
    );
}

const CartIcon = ({ totalItems, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Ionicons name="cart-outline" size={25} color="#E8AABE" />
                {totalItems > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            padding: 5,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {totalItems}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E5E7E6',
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    priceText: {
        fontSize: 20,
        color: '#CA3C66',
        fontWeight: 'bold',
    },
    itemImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    addToCartButton: {
        backgroundColor: '#7DC3A5',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalItemImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    modalItemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    modalItemDescription: {
        fontSize: 16,
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    quantityButton: {
        backgroundColor: '#FFEAA1',
        borderRadius: 20,
        margin: 15,
        padding: 15,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    modalItemPrice: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#CA3C66',
    },
    addToCartModalButton: {
        backgroundColor: '#7DC3A5',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    goToCartButton: {
        backgroundColor: '#E8AABE',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    goToCartButtonText: {
        color: 'white',
        fontSize: 16,
    },
    titreText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
    },
});
