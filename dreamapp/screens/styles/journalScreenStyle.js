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
        paddingTop: 100,
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
      },
      searchBar: {
        flexDirection: "row",
        width: "80%",
        borderBottomWidth: 1,
        borderColor: "#fff",
        paddingHorizontal: 10,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#fff",
        marginHorizontal: 8,
      },
      gridContainer: {
        paddingBottom: 10,
        width: "100%",
      },
      dreamThumbnailContainer: {
        flex: 1,
        margin: 55,
        alignItems: "center",
        
      },
      dreamThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: "cover",
        padding: 5,
        borderWidth: 2,
        borderColor: "#000",
      },
      dreamTitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
  });