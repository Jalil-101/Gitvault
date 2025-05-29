import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity, View, StyleSheet} from "react-native";


const Index = () => {
  const { isDarkTheme, toggleTheme, colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <Text style={{color: colors.text}}>Button</Text>
     </TouchableOpacity>
    </View>
  );
};










const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0a7ea4",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 120,
  },
 
});

export default Index;
