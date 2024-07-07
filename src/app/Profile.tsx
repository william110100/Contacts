import {useNavigation} from '@react-navigation/native';
import {Button, Input} from '@ui-kitten/components';
import {memo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Header, KittenLayout} from '../components';
import {IPerson} from '../interfaces';
import {useOperationStore} from '../stores';
import {API_URL, DARK, LIGHT} from '../utilities/constants';

const Profile = () => {
  const {activity, person, setActivity, setLoading, setPerson} = useOperationStore();
  const {control, getValues, handleSubmit, reset, setValue} = useForm<IPerson>({
    defaultValues: {
      age: person?.age,
      firstName: person?.firstName,
      id: person?.id,
      lastName: person?.lastName,
      photo: person?.photo,
    },
    mode: 'onChange',
  });
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const onSubmit = async (data: IPerson) => {
    const requestBody = {
      age: parseInt(data?.age ?? 0),
      firstName: data?.firstName,
      lastName: data?.lastName,
      photo: data?.photo,
    };

    if (activity === 'create') {
      const res = await fetch(API_URL, {
        body: JSON.stringify(requestBody),
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
      });
      console.log(res);

      if (res.ok) navigation.goBack();
    } else {
      const res = await fetch(`${API_URL}/${person?.id}`, {
        body: JSON.stringify(requestBody),
        headers: {
          Accept: 'application/json',
        },
        method: 'PUT',
      });

      if (res.ok) {
        setPerson({
          age: '',
          firstName: '',
          id: '',
          lastName: '',
          photo: '',
        });
        navigation.goBack();
      }
    }
    reset();
  };

  const onUploadPhoto = async () => {
    const {assets} = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
    });
    setValue(
      'photo',
      `data:${assets?.[0]?.type};base64,${assets?.[0]?.base64}`,
    );
  };

  return (
    <KittenLayout>
      <Header>
        <Button
          appearance="ghost"
          onPress={() => {
            reset();
            setActivity('none');
            navigation.goBack();
          }}
          status="primary"
          style={styles.button}>
          Cancel
        </Button>
        <Button
          appearance="ghost"
          onPress={handleSubmit(onSubmit)}
          status="primary"
          style={styles.button}>
          Done
        </Button>
      </Header>
      <View style={styles.photo}>
        <Image source={{uri: getValues('photo')}} style={styles.avatar} />
        <Button
          appearance="ghost"
          onPress={onUploadPhoto}
          status="primary"
          style={styles.button}>
          Add Photo
        </Button>
      </View>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="firstName"
          render={({field: {onChange, value}}) => (
            <Input
              onChangeText={onChange}
              placeholder="First name"
              style={{...styles.input, borderColor: isDarkMode ? LIGHT : DARK}}
              value={value}
            />
          )}
          rules={{required: ''}}
        />
        <Controller
          control={control}
          name="lastName"
          render={({field: {onChange, value}}) => (
            <Input
              onChangeText={onChange}
              placeholder="Last name"
              style={{...styles.input, borderColor: isDarkMode ? LIGHT : DARK}}
              value={value}
            />
          )}
          rules={{required: ''}}
        />
        <Controller
          control={control}
          name="age"
          render={({field: {onChange, value}}) => (
            <Input
              onChangeText={onChange}
              placeholder="Age"
              style={{...styles.input, borderColor: isDarkMode ? LIGHT : DARK}}
              value={`${value}`}
            />
          )}
          rules={{required: ''}}
        />
      </View>
    </KittenLayout>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#3C3C3C',
    borderRadius: 24,
    height: 100,
    width: 100,
  },
  button: {
    borderColor: '#4D4B59',
    borderRadius: 16,
    borderWidth: 0,
    fontSize: 16,
  },
  input: {
    borderRadius: 8,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 16,
    rowGap: 8,
  },
  photo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 16,
  },
});

export default memo(Profile);
