import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

const Section = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white'
  }
});

export default Section;