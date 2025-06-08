import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dreams from the backend
  const fetchDreams = async () => {
    try {
      setRefreshing(true);
      console.log("Fetching dreams...");
      const idToken = await auth.currentUser.getIdToken();
      const dreamsData = await getAllDreams(idToken);
      console.log("Fetched Dreams:", dreamsData);
      setDreams(dreamsData);
    } catch (error) {
      console.error("Error fetching dreams:", error);
    } finally {
      setRefreshing(false);
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
    ));
  });

  // Group dreams by date
  const dreamsByDate = dreamsToDisplay.reduce((acc, dream) => {
    const dateObj = new Date(dream.createdAt);
    const formatted = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    if (!acc[formatted]) acc[formatted] = [];
    acc[formatted].push(dream);
    return acc;
  }, {});

  // Timeline data
  const timelineData = Object.entries(dreamsByDate).map(([date, dreams]) => ({
    time: date,
    dreams,
  }));

  const handleDreamPress = async (dreamId) => {
    const idToken = await auth.currentUser.getIdToken();
    const dream = await getDreamById(idToken, dreamId);
    if (dream) {
      navigation.navigate("Dream", { dream: dream });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDreams();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <Text style={styles.sectionTitle}>Journal</Text>

      {/* Toggle Buttons */}
      <View style={styles.toggleButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === "grid" ? styles.toggleButtonActive : styles.toggleButtonInactive,
          ]}
          onPress={() => setViewMode("grid")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              viewMode === "grid" ? styles.toggleButtonTextActive : styles.toggleButtonTextInactive,
            ]}
          >
            Library
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === "timeline" ? styles.toggleButtonActive : styles.toggleButtonInactive,
          ]}
          onPress={() => setViewMode("timeline")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              viewMode === "timeline" ? styles.toggleButtonTextActive : styles.toggleButtonTextInactive,
            ]}
          >
            Timeline
          </Text>
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
      {refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : viewMode === "grid" ? (
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
          refreshing={refreshing}
          onRefresh={onRefresh}
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dreamDetailRow}
            >
              {rowData.dreams.map((dream, idx) => (
                <TouchableOpacity
                  key={dream.id}
                  onPress={() => setSelectedDream(dream)}
                  style={{ marginRight: 8 }}
                >
                  {dream.image && (
                    <Image source={{ uri: dream.image }} style={styles.dreamImage} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      {/* Modal for dream */}
      <Modal
        visible={!!selectedDream}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedDream(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setSelectedDream(null)}>
            <View style={styles.modalOverlayTouchable} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            {selectedDream?.image && (
              <Image source={{ uri: selectedDream.image }} style={styles.modalImage} />
            )}
            <View style={styles.modalTagsContainer}>
              <ScrollView
                contentContainerStyle={styles.modalTagsScroll}
                showsVerticalScrollIndicator={false}
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