import {Icon, IconElement} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const ActionIcon = (props: any): IconElement => (
  <Icon {...props} fill={props.fill} name={props.name} style={styles.icon} />
);

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
