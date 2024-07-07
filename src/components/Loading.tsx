import {Modal, Spinner} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useOperationStore} from '../stores';

export const Loading = () => {
  const {loading} = useOperationStore();

  return (
    <Modal backdropStyle={styles.backdrop} visible={loading}>
      <Spinner size="giant" />
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
