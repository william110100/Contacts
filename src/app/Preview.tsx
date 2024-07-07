import {Button, Text} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {memo, useEffect} from 'react';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {ActionIcon, Alert, Header, KittenLayout} from '../components';
import {getContactById} from '../services';
import {useOperationStore} from '../stores';
import {DARK, LIGHT} from '../utilities/constants';

const Preview = () => {
  const route = useRoute();
  const {profileId}: any = route?.params;
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const {setActivity, setLoading, setPerson, setVisible} = useOperationStore();
  const {data: contact, reset, trigger} = getContactById(profileId);

  const onDelete = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (!contact) {
      trigger();
    } else {
      setPerson({
        age: `${contact?.age}`,
        firstName: contact?.firstName,
        id: contact?.id,
        lastName: contact?.lastName,
        photo: contact?.photo,
      });
    }
  }, [contact, setPerson, trigger]);

  return (
    <KittenLayout>
      <Header>
        <Button
          accessoryLeft={() => (
            <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="chevron-left" />
          )}
          appearance="ghost"
          onPress={() => {
            setPerson({
              age: '',
              firstName: '',
              id: '',
              lastName: '',
              photo: '',
            });
            setActivity('none');
            navigation.goBack();
          }}
          style={styles.button}></Button>
        <Button
          appearance="ghost"
          onPress={() => {
            setActivity('update');
            navigation.navigate('Profile', {profileId: profileId});
            reset();
          }}
          status="primary"
          style={styles.button}>
          Edit
        </Button>
      </Header>
      <View
        style={{
          ...styles.card,
          backgroundColor: isDarkMode ? '#1F1F1F' : '#FFFFFF',
        }}>
        <View style={styles.profile}>
          <Image source={{uri: contact?.photo}} style={styles.avatar} />
          <View style={styles.person}>
            <Text
              category="s1"
              style={{color: isDarkMode ? '#FFFFFF' : '#040406'}}>
              {`${contact?.firstName ?? ''} ${contact?.lastName ?? ''}`}
            </Text>
            <Text
              category="c1"
              style={{color: isDarkMode ? '#FFFFFF' : '#040406'}}>
              {`${contact?.age ?? 0}`} years old
            </Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            accessoryLeft={() => (
              <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="phone" />
            )}
            appearance="ghost"
            style={{
              ...styles.button,
              ...styles.buttonActivity,
              backgroundColor: isDarkMode ? '#3C3C3C' : '#DCDCDC',
            }}></Button>
          <Button
            accessoryLeft={() => (
              <ActionIcon
                fill={isDarkMode ? LIGHT : DARK}
                name="message-circle"
              />
            )}
            appearance="ghost"
            style={{
              ...styles.button,
              ...styles.buttonActivity,
              backgroundColor: isDarkMode ? '#3C3C3C' : '#DCDCDC',
            }}></Button>
          <Button
            accessoryLeft={() => (
              <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="email" />
            )}
            appearance="ghost"
            style={{
              ...styles.button,
              ...styles.buttonActivity,
              backgroundColor: isDarkMode ? '#3C3C3C' : '#DCDCDC',
            }}></Button>
        </View>
      </View>
      <Button
        appearance="ghost"
        onPress={onDelete}
        status="danger"
        style={styles.button}>
        Delete Contact
      </Button>
      <Alert text="Failed to delete this contact!" />
    </KittenLayout>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 24,
    height: 50,
    width: 50,
  },
  button: {
    borderColor: '#4D4B59',
    borderRadius: 16,
    borderWidth: 0,
    fontSize: 16,
  },
  buttonActivity: {
    borderRadius: 16,
    width: '30%',
  },
  buttonGroup: {
    columnGap: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 16,
    rowGap: 16,
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 16,
    padding: 16,
  },
  person: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 2,
  },
  profile: {
    alignItems: 'center',
    columnGap: 16,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default memo(Preview);
