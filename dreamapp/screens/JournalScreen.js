import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles/journalScreenStyle";
// import Search from "../components/SearchButton";
import Menu from "../components/Menu";
import { getAllDreams, getDreamById } from "../api/dream";
import { auth } from "../config/firebase";
import Background from "../components/Background.js"; // Import Background component

export default function Journal({ navigation, route }) {
  const [dreams, setDreams] = useState([]); // Store all dreams
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredDreams, setFilteredDreams] = useState([]); // Filtered dreams

  // Fetch dreams from the backend
  const fetchDreams = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const dreamsData = await getAllDreams(idToken); // Fetch dreams
      setDreams(dreamsData);
    } catch (error) {
      console.error("Error fetching dreams:", error);
    }
  };  

  useEffect(() => {
    fetchDreams();
  }, [route.params?.refresh]);

  // const handleSearch = () => {
  //   const filtered = dreams.filter((dream) =>
  //     dream.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  //   );
  //   setFilteredDreams(filtered);
  // };

  const dreamsToDisplay = searchTerm ? filteredDreams : dreams;

  const handleDreamPress = async (dreamId) => {
    const idToken = await auth.currentUser.getIdToken();
    const dream = await getDreamById(idToken, dreamId); // Fetch the selected dream by ID
    console.log("Selected dream:", dream);
    if (dream) {
      navigation.navigate("Dream", { dream: dream }); // Navigate to DreamScreen with the selected dream
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      
      <Text style={styles.sectionTitle}>Journal</Text>

      {/* Search Bar */}
      {/* <View style={styles.searchBar}>
        <Search onPress={handleSearch} />
        <TextInput
          placeholder="Search by tags..."
          placeholderTextColor="#fff"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View> */}

      {/* Dreams List */}
      <FlatList
        data={dreamsToDisplay}
        keyExtractor={(item) => item.id}
        numColumns={3} // Display 3 items per row
        key={3} // Add a unique key to force re-render when numColumns changes
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDreamPress(item.id)} style={styles.dreamThumbnailContainer}>
            <Image source={{ uri: item.image }} style={styles.dreamThumbnail} />
            {/* <Text style={styles.dreamTitle}>Dream {item.id}</Text> */}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gridContainer}
      />

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}