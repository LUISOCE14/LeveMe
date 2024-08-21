import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackScreenWelcome from './StackScreenWelcome';
import TabNavigation from './TabNavigationApp';
import { AuthContext } from '../context/authContext'; // Asegúrate de que la ruta sea correcta


const AppNavigationDecision = () => {
  const { isAuthenticated,login } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isAuthenticated? (
        <StackScreenWelcome />
      ) : (
        <TabNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppNavigationDecision;