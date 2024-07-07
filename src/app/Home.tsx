import * as eva from '@eva-design/eva';
import {useNavigation} from '@react-navigation/native';
import {Button, Input, List, Text} from '@ui-kitten/components';
import {memo, useEffect, useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {ActionIcon, Header, KittenLayout, Person} from '../components';
import {IPerson} from '../interfaces';
import {getContacts} from '../services';
import {useOperationStore} from '../stores';
import {DARK, LIGHT} from '../utilities/constants';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const {setActivity, setLoading} = useOperationStore();
  const [keyword, setKeyword] = useState<string>('');
  const {data, isLoading} = getContacts();

  useEffect(() => setLoading(isLoading), [isLoading, setLoading]);

  return (
    <KittenLayout>
      <Header paddingHorizontal={16}>
        <Text category="h3" style={{color: isDarkMode ? LIGHT : DARK}}>
          Contacts
        </Text>
        <Button
          accessoryLeft={() => (
            <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="person-add" />
          )}
          appearance="ghost"
          onPress={() => {
            setActivity('create');
            navigation.navigate('Profile', {profileId: ''});
          }}
          size="tiny"
          style={styles.button}></Button>
      </Header>
      <Input
        accessoryLeft={() => (
          <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="search-outline" />
        )}
        onChangeText={text => setKeyword(text)}
        placeholder="Search"
        style={{
          ...styles.input,
          backgroundColor: isDarkMode ? eva.dark : eva.light,
          borderColor: isDarkMode ? LIGHT : DARK,
        }}
        value={keyword}
      />
      <List
        data={data}
        renderItem={({item}: {item: IPerson}) => (
          <Person
            age={item?.age}
            firstName={item?.firstName}
            id={item?.id}
            lastName={item?.lastName}
            photo={item?.photo}
            key={item?.id}
          />
        )}
        style={{
          ...styles.list,
          backgroundColor: isDarkMode ? eva.dark : eva.light,
        }}
      />
    </KittenLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#4D4B59',
    borderRadius: 20,
    borderWidth: 0,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  input: {
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  list: {
    columnGap: 8,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '80%',
    paddingHorizontal: 12,
  },
});

export default memo(Home);
