import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DreamCard = ({ dream }) => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: dream.coverImageUrl }} style={styles.image} /> */}
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{dream.date}</Text>
        <View style={styles.tagContainer}>
          {dream.tags.slice(0, 3).map((tag, index) => (
            <Text key={index} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    padding: 12,
  },
  date: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  tag: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  description: {
    color: '#aaa',
    fontSize: 13,
  },
});

export default DreamCard;
