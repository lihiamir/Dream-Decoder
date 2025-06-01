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

  // Fetch dreams from the backend
  const fetchDreams = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const dreamsData = await getAllDreams(idToken);
      setDreams(dreamsData);
    } catch (error) {
      console.error("Error fetching dreams:", error);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, [route.params?.refresh]);

  // Filter dreams by tags
  const dreamsToDisplay = dreams.filter((dream) => {
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    return (
      (dream.tags && dream.tags.some((tag) => tag.toLowerCase().includes(lower)))
    );
  });

  const handleDreamPress = async (dreamId) => {
    const idToken = await auth.currentUser.getIdToken();
    const dream = await getDreamById(idToken, dreamId);
    if (dream) {
      navigation.navigate("Dream", { dream: dream });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <Text style={styles.sectionTitle}>Journal</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        {/* You can use a search icon here if you want */}
        <TextInput
          placeholder="Filter by tags..."
          placeholderTextColor="#fff"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Dreams List */}
      <FlatList
        data={dreamsToDisplay}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDreamPress(item.id)} style={styles.dreamThumbnailContainer}>
            <Image source={{ uri: item.image }} style={styles.dreamThumbnail} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gridContainer}
      />

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}