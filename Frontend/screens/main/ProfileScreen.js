import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import Toast from "react-native-toast-message";
import {
  fetchDashboardData,
  fetchUserProfile,
  updateUserAvatar,
} from "../../api/movieApi";

const screenWidth = Dimensions.get("window").width - 40;

const avatarImages = {
  "general_avatar.png": require("../../assets/images/general_avatar.png"),
  "avatar1.jpg": require("../../assets/images/avatar1.jpg"),
  "avatar2.jpg": require("../../assets/images/avatar2.jpg"),
  "avatar3.jpg": require("../../assets/images/avatar3.jpg"),
  "avatar4.jpg": require("../../assets/images/avatar4.jpg"),
};

const chartColors = [
  "#1abc9c",
  "#9b59b6",
  "#34495e",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#16a085",
  "#27ae60",
  "#f1c40f",
  "#e67e22",
];

const chartConfig = {
  backgroundColor: "#000",
  backgroundGradientFrom: "#000",
  backgroundGradientTo: "#000",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const ProfileScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const loadEverything = useCallback(async () => {
    try {
      setRefreshing(true);
      const [dashboard, profile] = await Promise.all([
        fetchDashboardData(),
        fetchUserProfile(),
      ]);
      setDashboardData(dashboard);
      setUser(profile);
      setSelectedAvatar(profile.avatar);
    } catch (e) {
      console.error("Error loading data:", e);
    } finally {
      setRefreshing(false);
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEverything();
  }, []);

  const handleAvatarChange = async (avatarFileName) => {
    try {
      await updateUserAvatar(`/images/${avatarFileName}`);
      setSelectedAvatar(avatarFileName);
      setAvatarModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Avatar Updated!",
        text2: "You look even cooler now 😎",
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Could not change avatar. Try again 🙏",
      });
    }
  };

  if (pageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5c0000" />
      </View>
    );
  }

  const safeDashboardData = dashboardData || {};
  const safeMoviesPerMonth = safeDashboardData.moviesPerMonth || {};
  const safeGenresWatched = safeDashboardData.genresWatched || {};

  const genreData = Object.keys(safeGenresWatched).length
    ? Object.keys(safeGenresWatched).map((genre, index) => ({
        name: genre,
        population: safeGenresWatched[genre],
        color: chartColors[index % chartColors.length],
        legendFontColor: "#fff",
        legendFontSize: 12,
      }))
    : [
        {
          name: "No Data",
          population: 1,
          color: "#555",
          legendFontColor: "#fff",
          legendFontSize: 12,
        },
      ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadEverything}
          tintColor="#fff"
        />
      }
    >
      {/* Avatar Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            avatarImages[selectedAvatar] || avatarImages["general_avatar.png"]
          }
          style={styles.avatar}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => setAvatarModalVisible(true)}
        >
          <Text style={styles.saveBtnText}>Change Avatar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Avatar Selection */}
      <Modal visible={avatarModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subHeader}>Choose Your Avatar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.keys(avatarImages).map((file) => (
                <TouchableOpacity
                  key={file}
                  onPress={() => handleAvatarChange(file)}
                >
                  <Image
                    source={avatarImages[file]}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === file && styles.selectedAvatar,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.saveBtn, { marginTop: 20 }]}
              onPress={() => setAvatarModalVisible(false)}
            >
              <Text style={styles.saveBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* User Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>First Name:</Text>
        <Text style={styles.infoValue}>{user?.firstName ?? "-"}</Text>
        <Text style={styles.infoLabel}>Last Name:</Text>
        <Text style={styles.infoValue}>{user?.lastName ?? "-"}</Text>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{user?.email ?? "-"}</Text>
      </View>

      {/* Dashboard */}
      <Text style={styles.header}>Dashboard 📊</Text>

      {/* User Stats */}
      <Text style={styles.chartTitle}>User Stats 📈</Text>
      <BarChart
        data={{
          labels: ["Movies", "Hours", "Avg Rating"],
          datasets: [
            {
              data: [
                safeDashboardData.totalMoviesWatched ?? 0,
                safeDashboardData.totalHoursWatched ?? 0,
                safeDashboardData.averageRating ?? 0,
              ],
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Monthly Activity */}
      <Text style={styles.chartTitle}>Monthly Activity 📅</Text>
      <LineChart
        data={{
          labels: Object.keys(safeMoviesPerMonth).length
            ? Object.keys(safeMoviesPerMonth)
            : ["No Data"],
          datasets: [
            {
              data: Object.values(safeMoviesPerMonth).length
                ? Object.values(safeMoviesPerMonth)
                : [0],
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Genre Distribution */}
      <Text style={styles.chartTitle}>Genre Distribution 🎭</Text>
      <PieChart
        data={genreData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
  },
  chart: { marginVertical: 8, borderRadius: 16 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  profileSection: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  saveBtn: {
    backgroundColor: "#5c0000",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnText: { color: "#fff", fontWeight: "600" },
  avatarScroll: { marginVertical: 10 },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAvatar: { borderColor: "#5c0000" },
  infoSection: { marginVertical: 20 },
  infoLabel: { color: "#888", fontSize: 14, marginTop: 10 },
  infoValue: { color: "#fff", fontSize: 16, fontWeight: "500" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
});

export default ProfileScreen;
