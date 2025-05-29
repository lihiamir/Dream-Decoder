import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Menu({ navigation }) {
    return(
        <TouchableOpacity onPress={() => navigation.openDrawer()}  style={styles.menuButton}>
        <Image source={require("../assets/images/menu.png")} />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        position: "absolute",
        top: 15,
        left: 0,
        width: 30,
        resizeMode: "contain",
        margin: 20,
    },
});
