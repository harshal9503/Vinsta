import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import { COLORS } from "../../../theme/colors";
import ActiveOrders from "./ActiveOrders";
import PreviousOrder from "./PreviousOrder";
import { getFontFamily, getFontWeight } from "../../../utils/fontHelper";
import { useNavigation } from "@react-navigation/native";

const MySubscription = ({
  subTab,
  setSubTab,
  activeSubs,
  previousSubs,
  setRatingModal,
}) => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>

      {/* ----------- TABS (New UI) ----------- */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View
          style={[
            styles.tabContainer,
            {
              backgroundColor: isDarkMode ? "#1A1A1A" : "#F4F4F4",
              borderColor: isDarkMode ? theme.borderColor : "transparent",
              borderWidth: isDarkMode ? 1 : 0,
            },
          ]}
        >
          {/* Active Tab */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              subTab === "Active" && styles.activeTab,
            ]}
            onPress={() => setSubTab("Active")}
          >
            <Text
              style={[
                styles.tabText,
                { color: subTab === "Active" ? "#fff" : theme.text },
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>

          {/* Previous Tab */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              subTab === "Previous" && styles.activeTab,
            ]}
            onPress={() => setSubTab("Previous")}
          >
            <Text
              style={[
                styles.tabText,
                { color: subTab === "Previous" ? "#fff" : theme.text },
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- HEADING ---------- */}
      <View style={styles.activeHeader}>
        <Image
          source={require("../../../assets/p1.png")}
          style={styles.plusIcon}
        />

        <Text style={[styles.activeTitle, { color: theme.text }]}>
          {subTab === "Active"
            ? "My active subscription's"
            : "Previous subscription's"}
        </Text>
      </View>

      {/* ---------- CARD LIST ---------- */}
      {(subTab === "Active" ? activeSubs : previousSubs).map((s) => (
        <View
          key={s.id}
          style={[styles.subCard, { backgroundColor: theme.cardBackground }]}
        >
          <ActiveOrders
            sub={s}
            isPrevious={false}
            openRatingModal={() => setRatingModal(true)}
          />

          {subTab === "Previous" && (
            <PreviousOrder
              onRatePress={() => setRatingModal(true)}
              onResubscribePress={() =>
                navigation.navigate("ReSubscribeScreen")
              }
            />
          )}
        </View>
      ))}

      {/* ---------- FOOTER ---------- */}
      {subTab === "Active" && (
        <View style={styles.bottomNoteRow}>
          <Text style={styles.cancelNote}>
            Subscription plan cannot be cancelled
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddMoreSubscription")}
          >
            <Text style={styles.addText}>+ Add More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MySubscription;

/* ----------------------- STYLES ----------------------- */

const styles = StyleSheet.create({
  /* ---- Tabs Outer Box ---- */
  tabContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: 'hidden',
    elevation: 3,
  },

  /* ---- Each Tab ---- */
  tabBtn: {
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'transparent',

  },

  /* ---- Active Tab ---- */
  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 14,
    fontFamily: getFontFamily("Medium"),
    fontWeight: getFontWeight("Medium"),
  },

  /* ---- Heading Row ---- */
  activeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },

  plusIcon: { width: 20, height: 20 },

  activeTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: getFontFamily("Bold"),
  },

  /* ---- Subscription Card ---- */
  subCard: {
    margin: 20,
    marginBottom: 16,
    borderRadius: 14,
    elevation: 3,
    padding: 14,
  },

  bottomNoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },

  cancelNote: {
    color: "#EA001B",
    fontSize: 13,
    fontFamily: getFontFamily("Medium"),
  },

  addText: {
    color: "#259E29",
    fontSize: 13,
    fontFamily: getFontFamily("Bold"),
  },
});
