// import React from "react";
// import { View, Text, Image, FlatList, ScrollView, SafeAreaView, TextInput } from "react-native";
// import RoundedMicIcon from "../assets/images/micOff.png";
// import styles from "./styles/journalScreenStyle";
// import Search from "../components/SearchButton";
// import DreamCard from "../components/DreamCard";
// import Menu from "../components/Menu";
// import { useState, useEffect } from "react";

// export default function Journal ({ navigation, route }) {
//     const { user } = route.params;
//     // const { userKey } = user.key;

//     const [dreams, setDreams] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredDreams, setFilteredDreams] = useState([]);
  
//     // useEffect(() => {
//     //   // Fetch dreams from backend
//     //   const fetchDreams = async () => {
//     //     try {
//     //       const response = await axios.get(`https://your-api.com/users/${userKey}/dreams`);
//     //       setDreams(response.data);
//     //     } catch (error) {
//     //       console.error("Failed to fetch dreams", error);
//     //     }
//     //   };
  
//     //   fetchDreams();
//     // }, [userKey]);

//     const handleSearch = () => {
//         const filtered = dreams.filter(dream =>
//           dream.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//         setFilteredDreams(filtered);
//       };

//       const dreamsToDisplay = searchTerm ? filteredDreams : dreams;



//   return (
//     <SafeAreaView style={styles.container}>
//       <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
//       <Image source={require("../assets/images/moon.png")} style={styles.moon} />                
//       <Image source={require("../assets/images/c1.png")} style={styles.c1} />
//       <Image source={require("../assets/images/c2.png")} style={styles.c2} />
//       <Image source={require("../assets/images/c3.png")} style={styles.c3} />

//       <Text style={styles.sectionTitle}>Journal</Text>

//       <View style={styles.searchBar}>
//         <Search onPress={handleSearch}/>
//         <TextInput
//           placeholder="Search by tags..."
//           placeholderTextColor="#fff"
//           style={styles.searchInput}
//           value={searchTerm}
//           onChangeText={setSearchTerm}
//         />
//       </View>

//       <Text style={styles.orderText}>
//         <Text style={styles.orderLabel}>Order by: </Text>
//         <Text style={styles.orderValue}>Date</Text>
//       </Text>

//       <FlatList
//         data={dreamsToDisplay}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <DreamCard dream={item} />
//         )}
//       />
//         <Menu navigation={navigation} />
//     </SafeAreaView>
//   );
// };