import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import Login from '../Auth/Login';
import OTP from '../Auth/OTP';
import Home from '../BottomScreens/Home';
import Profile from '../BottomScreens/Profile';
import Cart from '../BottomScreens/Cart';
import Menu from '../BottomScreens/Menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemsPage from '../MenuExtra/ItemsPage';
import Address from '../MenuExtra/Address';
import Pickup from '../MenuExtra/Pickup';
import NewAddress from '../MenuExtra/NewAddress';
import Checkout from '../MenuExtra/Checkout';
import Schedule from '../MenuExtra/Schedule';
import Onboarding from '../Auth/Onboarding';
import OrderHistory from '../History/OrderHistory';
import OrderDetails from '../History/OrderDetails';
import PickupDetails from '../History/PickupDetails';




const Tab = createBottomTabNavigator();

function Bottom() {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          
          screenOptions={{
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 11, marginBottom: 5,  },
            tabBarInactiveTintColor: "#666666",
            tabBarActiveTintColor: "#C620E3",
            tabBarStyle: {
              height: Dimensions.get("window").height*0.07,
              position: "absolute",
              backgroundColor:"white",
              flex:1
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Octicons name="home" size={24} color={color} />
              ),
            }}
          />
        <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarLabel: "Menu",
              tabBarIcon: ({ color }) => (
                <Feather name="grid" size={24} color={color} />
                ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-outline" size={26} color={color}/>
                 ),
            }}
          />
         
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: "Cart",
              tabBarIcon: ({ color }) => (
                <AntDesign name="shoppingcart" size={24} color={color}/>
                 ),
            }}
          />
         
        </Tab.Navigator>
      );
}
const Stack = createNativeStackNavigator();


function Nav (props){
    return (
        
          <Stack.Navigator screenOptions={{
       
        headerTintColor: 'yellow',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25
        }
    }}
    >


<Stack.Screen name="Bottom" component={Bottom}  options={{ headerShown: false }}/>
<Stack.Screen name="Onboarding" component={Onboarding}  options={{ headerShown: false }}/>
   
   
    <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
    <Stack.Screen name="OTP" component={OTP}  options={{ headerShown: false }}/>
    <Stack.Screen name="ItemsPage" component={ItemsPage}  options={{ headerShown: false }}/>
    <Stack.Screen name="Address" component={Address}  options={{ headerShown: false }}/>
    <Stack.Screen name="Pickup" component={Pickup}  options={{ headerShown: false }}/>
    <Stack.Screen name="NewAddress" component={NewAddress}  options={{ headerShown: false }}/>
    <Stack.Screen name="Schedule" component={Schedule}  options={{ headerShown: false }}/>
    <Stack.Screen name="Checkout" component={Checkout}  options={{ headerShown: false }}/>
    <Stack.Screen name="OrderHistory" component={OrderHistory}  options={{ headerShown: false }}/>
    <Stack.Screen name="OrderDetails" component={OrderDetails}  options={{ headerShown: false }}/>
    <Stack.Screen name="PickupDetails" component={PickupDetails}  options={{ headerShown: false }}/>
   
    </Stack.Navigator>
        
    )

}
export default Nav