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
    top: "-45%",
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
    sectionTitle: {
        paddingTop: 130,
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
      },
      searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#fff",
        marginBottom: 20,
        paddingHorizontal: 8,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#fff",
        marginHorizontal: 8,
      },
      gridContainer: {
        marginTop: 20,
        paddingHorizontal: 10, // Add padding around the grid
        paddingBottom: 20, // Add padding at the bottom
      },
      dreamThumbnailContainer: {
        flex: 1, // Ensure equal spacing
        margin: 5, // Add spacing between items
        alignItems: "center",
      },
      dreamThumbnail: {
        width: 150, // Adjust the size of the thumbnails
        height: 150,
        borderRadius: 10,
        resizeMode: "cover",
        padding: 5,
      },
      dreamTitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
  });