import React, { createContext, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./components/AppNavigation";
import OnboardingNavigation from "./components/OnboardingNavigation";

// Step 1: Create Auth Context
export const AuthContext = createContext();

// Step 2: Provider Component
const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(localStorage.getItem("token") || false);

  const updateAuthentication = (value) => {
    setUserAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ userAuthenticated, updateAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => useContext(AuthContext);

// App component
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// Auth Navigator
const AuthNavigator = () => {
  const { userAuthenticated } = useAuth();

  return !userAuthenticated ? <OnboardingNavigation /> : <AppNavigation />;
};
