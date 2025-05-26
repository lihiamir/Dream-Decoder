import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
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
        paddingBottom: 20, // Add padding at the bottom
      },
      dreamThumbnailContainer: {
        flex: 1, // Ensure equal spacing
        margin: 55, // Add spacing between items
        alignItems: "center",
      },
      dreamThumbnail: {
        width: 100, // Adjust the size of the thumbnails
        height: 100,
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