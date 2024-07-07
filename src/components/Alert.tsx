import {Button, Modal, Text} from '@ui-kitten/components';
import {FC} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {ActionIcon} from './ActionIcon';
import {useOperationStore} from '../stores';
import {DARK, LIGHT} from '../utilities/constants';

interface IAlert {
  text: string;
}

export const Alert: FC<IAlert> = ({text}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {visible, setVisible} = useOperationStore();

  return (
    <Modal backdropStyle={styles.backdrop} visible={visible}>
      <View style={styles.layout}>
        <Text>{text}</Text>
        <Button
          accessoryLeft={() => (
            <ActionIcon fill={isDarkMode ? LIGHT : DARK} name="close" />
          )}
          appearance="ghost"
          onPress={() => setVisible(false)}
          size="tiny"
          style={styles.button}></Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  button: {
    borderColor: '#4D4B59',
    borderRadius: 20,
    borderWidth: 0,
  },
  layout: {
    backgroundColor: '#FF8A8A',
    borderRadius: 16,
    alignItems: 'center',
    columnGap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
});
