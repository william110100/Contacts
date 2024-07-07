import {useNavigation} from '@react-navigation/native';
import {ListItem, Text} from '@ui-kitten/components';
import {FC} from 'react';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {IPerson} from '../interfaces';
import {DARK, LIGHT} from '../utilities/constants';

export const Person: FC<IPerson> = (props: IPerson) => {
  const {age, firstName, id, lastName, photo} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <ListItem
      onPress={() => navigation.navigate('Preview', {profileId: id})}
      style={{
        ...styles.card,
        backgroundColor: isDarkMode ? DARK : LIGHT,
      }}>
      <Image source={{uri: photo}} style={styles.avatar} />
      <View style={styles.person}>
        <Text category="s2" style={{color: isDarkMode ? LIGHT : DARK}}>
          {`${firstName} ${lastName}`}
        </Text>
        <Text category="c1" style={{color: isDarkMode ? LIGHT : DARK}}>
          {age ?? 0} years old
        </Text>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 24,
    height: 36,
    width: 36,
  },
  card: {
    alignItems: 'center',
    borderRadius: 40,
    columnGap: 8,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 4,
    padding: 12,
  },
  person: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 2,
  },
});
