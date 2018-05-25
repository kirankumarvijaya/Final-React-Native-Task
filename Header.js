import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";


const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00ff80",
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      android: {
        height: 44
      },
      ios: {
        height: 44
      }
    })
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    fontSize:20,
    paddingLeft:20,
    fontWeight:'bold'
  }
});
export default Header;
