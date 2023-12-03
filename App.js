import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Composant/Cart';
import Item from "./Composant/Item";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#CA3C66',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        backgroundColor: 'white',
                        display: 'flex',
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Item}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={25} color="#E8AABE" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cart-outline" size={25} color="#E8AABE" />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
