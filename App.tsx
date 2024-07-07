import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import {useColorScheme} from 'react-native';
import {SWRConfig} from 'swr';
import Home from './src/app/Home';
import Profile from './src/app/Profile';
import Preview from './src/app/Preview';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SWRConfig>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              component={Home}
              name="Home"
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={Preview}
              name="Preview"
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={Profile}
              name="Profile"
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    </SWRConfig>
  );
};

export default App;
