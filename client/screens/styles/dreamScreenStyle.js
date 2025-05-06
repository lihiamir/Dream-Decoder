import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
  },
  rectangle: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    resizeMode: 'cover',
  },
  moon: {
    width: '75%',
    height: '75%',
    position: "absolute",
    top: "-55%",
    resizeMode: "contain",
      },
    c1: {
        position: "absolute",
        top: 180,
        left: -140,
        resizeMode: "contain",
        opacity: 0.4,
      },
    c2: {
        position: "absolute",
        bottom: 220,
        right: -85,
        resizeMode: "contain",
        opacity: 0.4,
      },
    c3: {
        position: "absolute",
        bottom: -200,
        opacity: 0.4,
      },

    interpretationContainer: {
      padding: 20,
    },
    dreamImage: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 10,
    },
    interpretationText: {
      fontSize: 16,
      color: "#fff",
      marginBottom: 10,
    },
    boldText: {
      fontWeight: "bold",
    },
    similarDreamsContainer: {
      padding: 20,
    },
    similarDreamsScroll: {
      marginTop: 10,
    },
    similarDreamImage: {
      width: 120,
      height: 120,
      borderRadius: 10,
      marginRight: 10,
    },
  });