import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../theme/colors";
import { ThemeContext } from "../../theme/ThemeContext";
import font from "../../assets/fonts";

const { width, height } = Dimensions.get("window");
const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight;

const ICONS = {
  location: require("../../assets/location.png"),
  drop: require("../../assets/drop.png"),
  boy: require("../../assets/boy.png"),
  tick: require("../../assets/tick.png"),
  "1st": require("../../assets/1st.png"),
  "2nd": require("../../assets/2nd.png"),
  "3rd": require("../../assets/3rd.png"),
  "4th": require("../../assets/4th.png"),
};

const deliverySteps = [
  { step: "1st", showTick: true },
  { step: "2nd", showTick: true },
  { step: "3rd", showTick: false },
  { step: "4th", showTick: false },
];

const TrackOrder = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useContext(ThemeContext);

  const headerTop = STATUS_BAR_HEIGHT + 10;
  const markerSize = width * 0.08;
  const boyIconSize = width * 0.15;
  const lineWidth = width * 0.015;
  const horizontalLineLength = width * 0.18;

  const handleCall = () => {
    const phoneNumber = "+911234567890";
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => {
      console.log("Error making phone call:", err);
    });
  };

  const handleMessage = () => {
    navigation.navigate("chat");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent
      />

      {/* MAP AREA */}
      <View style={styles.fixedMapArea}>
        {/* Statusbar overlay */}
        <View
          style={[
            styles.statusBarOverlay,
            {
              backgroundColor: isDarkMode
                ? "rgba(0,0,0,0.4)"
                : "rgba(255,255,255,0.9)",
            },
          ]}
        />

        <Image
          source={require("../../assets/mapbg.png")}
          style={styles.mapBg}
        />

        {/* HEADER */}
        <View style={[styles.header, { top: headerTop }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/back.png")}
              style={[
                styles.backIcon,
                { tintColor: theme.text },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: theme.text },
            ]}
          >
            Track Order
          </Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Zigzag Line */}
        <View style={styles.absFill}>
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.3,
                left: width / 2 - lineWidth / 2,
                height: MAP_HEIGHT * 0.26,
                backgroundColor: COLORS.primary,
              },
            ]}
          />

          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: lineWidth,
                width: horizontalLineLength,
                backgroundColor: COLORS.primary,
              },
            ]}
          />

          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: MAP_HEIGHT * 0.26,
                backgroundColor: COLORS.primary,
              },
            ]}
          />
        </View>

        {/* Icons on map */}
        <View style={[styles.absFill, { alignItems: "center" }]}>
          {/* Pickup */}
          <Image
            source={ICONS.location}
            style={{
              width: markerSize,
              height: markerSize,
              tintColor: COLORS.primary,
              position: "absolute",
              top: MAP_HEIGHT * 0.26,
              left: width / 2 - markerSize / 2,
            }}
          />

          {/* Boy */}
          <Image
            source={ICONS.boy}
            style={{
              width: boyIconSize,
              height: boyIconSize,
              borderRadius: 50,
              position: "absolute",
              top: MAP_HEIGHT * 0.48,
              left: width / 2 - boyIconSize / 2,
              backgroundColor: theme.cardBackground,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />

          {/* Drop */}
          <Image
            source={ICONS.drop}
            style={{
              width: markerSize * 0.8,
              height: markerSize * 0.8,
              position: "absolute",
              top: MAP_HEIGHT * 0.75,
              left:
                width / 2 - horizontalLineLength - markerSize / 2,
              tintColor: COLORS.primary,
            }}
          />
        </View>
      </View>

      {/* Scroll area */}
      <ScrollView
        style={[
          styles.scrollSection,
          { backgroundColor: theme.background },
        ]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Card */}
        <View
          style={[
            styles.orderCard,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Image
            source={require("../../assets/poha.png")}
            style={styles.foodImg}
          />

          <View style={styles.orderInfoContainer}>
            <View style={styles.rowBetween}>
              <Text style={[styles.orderId, { color: COLORS.primary }]}>
                #265896
              </Text>
              <Text style={[styles.price, { color: theme.text }]}>
                ₹ 50.00
              </Text>
            </View>

            <Text style={[styles.foodName, { color: theme.text }]}>
              Masala Poha
            </Text>

            <Text
              style={[
                styles.orderInfo,
                { color: theme.textSecondary },
              ]}
            >
              22 Sep, 9.00 • 3 Items
            </Text>

            <View style={styles.rowBetween}>
              <View>
                <Text
                  style={[
                    styles.estimateLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Estimate Arrival
                </Text>
                <Text
                  style={[styles.estimateTime, { color: COLORS.primary }]}
                >
                  25 min
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={[
                    styles.estimateLabel,
                    { color: theme.textSecondary },
                  ]}
                >
                  Now
                </Text>
                <Text style={[styles.foodStatus, { color: theme.text }]}>
                  Food on the way
                </Text>
              </View>
            </View>
          </View>
        </View>

       {/* Delivery Icons */}
<View style={styles.deliveryIconsRow}>
  {deliverySteps.map((item, idx) => (
    <React.Fragment key={idx}>
      <View style={styles.deliveryStepContainer}>
        <Image
          source={ICONS[item.step]}
          style={[
            styles.deliveryIcon,
            {
              tintColor: isDarkMode
                ? "#fff"                      
                : item.showTick
                ? COLORS.success              
                : theme.textSecondary,        
            },
          ]}
        />

        {item.showTick ? (
          <View style={styles.tickWrap}>
            <Image
              source={ICONS.tick}
              style={[
                styles.tickIcon,
                { tintColor: isDarkMode ? "#fff" : "#fff" },
              ]}
            />
          </View>
        ) : (
          <View style={styles.tickPlaceholder} />
        )}
      </View>

      {idx !== deliverySteps.length - 1 && (
        <View
          style={[
            styles.connectorLine,
            {
              backgroundColor: isDarkMode
                ? "#555"    // slightly lighter line in dark
                : theme.border,
            },
          ]}
        />
      )}
    </React.Fragment>
  ))}
</View>

<Text style={[styles.deliveryText, { color: theme.text }]}>
  Packet In Delivery
</Text>

        {/* ORDER STATUS */}
<View style={styles.statusSection}>
  <Text style={[styles.statusTitle, { color: theme.text }]}>
    Order Status Details
  </Text>

  {[
    { title: "Order placed", done: true },
    { title: "Restaurant confirmed", done: true },
    { title: "Preparing food", done: false },
    { title: "Order Picked", done: false },
    { title: "Out for delivery", done: false },
  ].map((item, index) => (
    <View key={index} style={styles.statusRow}>

      {/* LEFT STATUS ICONS */}
      <View style={styles.statusLeft}>
        {/* CIRCLE */}
        <View
          style={[
            styles.circle,
            {
              backgroundColor: item.done
                ? COLORS.success
                : isDarkMode
                ? "#555"      // grey circle in dark mode
                : theme.border,
            },
          ]}
        />

        {/* DOTTED LINE */}
        {index < 4 && (
          <View
            style={[
              styles.dottedLine,
              {
                borderColor: item.done
                  ? COLORS.success
                  : isDarkMode
                  ? "#ffffff80"  
                  : theme.border,
              },
            ]}
          />
        )}
      </View>

      {/* STATUS TEXT */}
      <View style={styles.statusContent}>
        <Text style={[styles.statusText, { color: theme.text }]}>
          {item.title}
        </Text>

        <Text
          style={[
            styles.statusTime,
            { color: isDarkMode ? "#bbb" : "#777" },
          ]}
        >
          {item.done ? "Completed" : "Pending"}
        </Text>
      </View>
    </View>
  ))}
</View>


        {/* Delivery Agent */}
        <View style={styles.agentSection}>
          <Image
            source={require("../../assets/user.png")}
            style={styles.agentImg}
          />

          <View style={styles.agentInfo}>
            <Text style={[styles.agentId, { color: theme.textSecondary }]}>
              ID: DKS-501F9
            </Text>
            <Text style={[styles.agentName, { color: theme.text }]}>
              Mann Sharma
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.actionBtns}>
            <TouchableOpacity
              style={[
                styles.callBtn,
                { backgroundColor: theme.cardBackground },
              ]}
              onPress={handleCall}
            >
              <Image
                source={require("../../assets/call.png")}
                style={[styles.callIcon, { tintColor: COLORS.primary }]}
              />
              <Text style={[styles.callText, { color: theme.text }]}>
                Call
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.msgBtn,
                { backgroundColor: COLORS.primary },
              ]}
              onPress={handleMessage}
            >
              <Image
                source={require("../../assets/message.png")}
                style={[styles.msgIcon, { tintColor: "#fff" }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },

  absFill: { ...StyleSheet.absoluteFillObject },

  fixedMapArea: {
    width: "100%",
    height: MAP_HEIGHT,
    overflow: "hidden",
  },

  statusBarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    zIndex: 9,
  },

  mapBg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  header: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Figtree-Bold",
  },

  zigzagLine: {
    position: "absolute",
    borderRadius: 2,
  },

  scrollSection: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  scrollContent: {
    paddingBottom: 50,
    paddingTop: 10,
  },

  orderCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 18,
    elevation: 2,
  },

  foodImg: { width: 70, height: 70, borderRadius: 10 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderId: {
    fontSize: 13,
    fontFamily: "Figtree-Medium",
  },

  price: {
    fontSize: 15,
    fontFamily: "Figtree-Bold",
  },

  foodName: {
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
  },

  orderInfo: {
    fontSize: 12,
    fontFamily: "Figtree-Medium",
  },

  estimateLabel: {
    fontSize: 12,
    fontFamily: "Figtree-Medium",
  },

  estimateTime: {
    fontSize: 14,
    fontFamily: "Figtree-SemiBold",
  },

  foodStatus: {
    fontSize: 13,
    fontFamily: "Figtree-SemiBold",
  },

  deliveryIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  deliveryIcon: {
    width: 38,
    height: 38,
  },

  tickWrap: {
    marginTop: 5,
    width: 22,
    height: 22,
    backgroundColor: COLORS.success,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  tickPlaceholder: {
    marginTop: 5,
    width: 22,
    height: 22,
  },

  tickIcon: {
    width: 12,
    height: 12,
    tintColor: "#fff",
  },

  connectorLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },

  deliveryText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Figtree-SemiBold",
    marginTop: 10,
  },

  statusSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },

  statusTitle: {
    fontSize: 16,
    fontFamily: "Figtree-SemiBold",
    marginBottom: 15,
  },

  statusRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  statusLeft: {
    alignItems: "center",
    marginRight: 15,
    width: 16,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  dottedLine: {
    height: 28,
    borderLeftWidth: 2,
    borderStyle: "dotted",
    marginTop: 2,
  },

  statusContent: { flex: 1 },

  statusText: {
    fontSize: 14,
    fontFamily: "Figtree-SemiBold",
  },

  agentSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },

  agentImg: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },

  agentInfo: { flex: 1, marginLeft: 10 },

  agentId: {
    fontSize: 12,
    fontFamily: "Figtree-Medium",
  },

  agentName: {
    fontSize: 14,
    fontFamily: "Figtree-SemiBold",
  },

  actionBtns: {
    flexDirection: "row",
    alignItems: "center",
  },

  callBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  callIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },

  callText: {
    fontSize: 13,
    fontFamily: "Figtree-Medium",
  },

  msgBtn: {
    padding: 10,
    borderRadius: 8,
  },

  msgIcon: { width: 18, height: 18 },
});
