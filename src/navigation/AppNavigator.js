import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { colors } from '../utils/colors';
import { useCart } from '../context/CartContext';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabIcons = {
  Home: ['home', 'home-outline'],
  Favorites: ['heart', 'heart-outline'],
  Cart: ['cart', 'cart-outline'],
  Profile: ['person', 'person-outline'],
};

function Tabs() {
    const { totalItems } = useCart();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = tabIcons[route.name];
          return <Ionicons name={focused ? active : inactive} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarBadge: totalItems > 0 ? totalItems : undefined }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: "Details",
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: "Checkout",
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
