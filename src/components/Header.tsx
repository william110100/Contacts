import {FC, PropsWithChildren} from 'react';
import {DimensionValue, StyleSheet, View} from 'react-native';

interface IHeader extends PropsWithChildren {
  paddingHorizontal?: DimensionValue | undefined;
}

export const Header: FC<IHeader> = ({children, paddingHorizontal}) => {
  return <View style={{...styles.header, paddingHorizontal}}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
