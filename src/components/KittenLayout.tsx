import * as eva from '@eva-design/eva';
import {Layout} from '@ui-kitten/components';
import {FC, PropsWithChildren} from 'react';
import {
  DimensionValue,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Loading} from './Loading';

interface IKittenLayout extends PropsWithChildren {
  paddingHorizontal?: DimensionValue | undefined;
}

export const KittenLayout: FC<IKittenLayout> = ({
  children,
  paddingHorizontal,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const evaMode = isDarkMode ? eva.dark : eva.light;
  const inverseEvaMode = isDarkMode ? eva.light : eva.dark;

  return (
    <SafeAreaView style={evaMode}>
      <StatusBar backgroundColor={evaMode} barStyle={inverseEvaMode} />
      <Layout
        style={{...styles.layout, backgroundColor: evaMode, paddingHorizontal}}>
        {children}
      </Layout>
      <Loading />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    rowGap: 16,
  },
});
