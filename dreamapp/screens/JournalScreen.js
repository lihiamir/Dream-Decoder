import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import Timeline from "react-native-timeline-flatlist";
import styles from "./styles/journalScreenStyle";
import Menu from "../components/Menu";
import { getAllDreams, getDreamById } from "../api/dream";
import { auth } from "../config/firebase";
import Background from "../components/Background.js";

export default function Journal({ navigation, route }) {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "timeline"
  const [selectedDream, setSelectedDream] = useState(null);

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
      (dream.tags && dream.tags.some((tag) => tag.toLowerCase().includes(lower))
    // dream.createdAt.toLowerCase().includes(lower)
    ));
  });

  // Timeline data
  const timelineData = dreamsToDisplay.map(dream => ({
    time: new Date(dream.createdAt).toLocaleDateString(),
    imageUrl: dream.image,
    dream,
  }));

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

      {/* Toggle Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: viewMode === "grid" ? "#fff" : "#351b64",
            paddingVertical: 8,
            paddingHorizontal: 24,
            borderRadius: 20,
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: "#351b64",
          }}
          onPress={() => setViewMode("grid")}
        >
          <Text style={{ color: viewMode === "grid" ? "#351b64" : "#fff", fontWeight: "bold" }}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: viewMode === "timeline" ? "#fff" : "#351b64",
            paddingVertical: 8,
            paddingHorizontal: 24,
            borderRadius: 20,
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: "#351b64",
          }}
          onPress={() => setViewMode("timeline")}
        >
          <Text style={{ color: viewMode === "timeline" ? "#351b64" : "#fff", fontWeight: "bold" }}>Timeline</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
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

      {/* Dreams List or Timeline */}
      {viewMode === "grid" ? (
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
      ) : (
        <Timeline
          data={timelineData}
          circleSize={24}
          circleColor="rgb(130, 92, 191)"
          lineColor="rgb(130, 92, 191)"
          timeStyle={styles.timelineTime}
          style={styles.timeline}
          renderDetail={rowData => (
            <TouchableOpacity onPress={() => 
            console.log("Dream selected:", rowData) ||
            setSelectedDream(rowData.dream)}>
              <View style={styles.dreamDetailRow}>
                {rowData.imageUrl && (
                  <Image source={{ uri: rowData.imageUrl }} style={styles.dreamImage} />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for dream  */}
      <Modal
        visible={!!selectedDream}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedDream(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setSelectedDream(null)}>
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            {selectedDream?.image && (
              <Image source={{ uri: selectedDream.image }} style={styles.modalImage} />
            )}
            <View style={{ height: 120, width: "100%" }}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  paddingVertical: 4,
                }}
                showsVerticalScrollIndicator={false} // Changed to false
              >
                {selectedDream?.tags && selectedDream.tags.length > 0 ? (
                  selectedDream.tags.map((tag, idx) => (
                    <View key={idx} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalDescription}>No tags available.</Text>
                )}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => {
                setSelectedDream(null);
                handleDreamPress(selectedDream.id);
              }}
            >
              <Text style={styles.modalCloseText}>View Dream</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}