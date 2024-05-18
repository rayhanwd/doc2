import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DoctorListsScreen from "../screens/DoctorListsScreen";
import ViewAppointmentsScreen from "../screens/ViewAppointmentsScreen";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Doctor-Lists"
        component={DoctorListsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-hospital" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
         <Tab.Screen
        name="doctor-details"
        component={DoctorDetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-hospital" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Appointments"
        component={ViewAppointmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
