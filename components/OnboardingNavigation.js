import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screens/SignupScreen";
import SigninScreen from "../screens/signIn";
import { AuthContext } from "../App";


const Stack = createStackNavigator();

const OnboardingNavigation = () => {
  const { userAuthenticated, updateAuthentication } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
        initialParams={{ updateAuthentication }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;
