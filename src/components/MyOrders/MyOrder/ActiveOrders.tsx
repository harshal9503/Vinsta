import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../../theme/colors";
import { ThemeContext } from "../../../theme/ThemeContext";
import { getFontFamily, getFontWeight } from "../../../utils/fontHelper";

const ActiveOrders = ({ sub }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: "transparent" }}>
      {/* CARD INSIDE */}
      <View style={styles.subCard}>
        {/* TOP ROW */}
        <View style={styles.subTopRow}>
          <Image source={sub.img} style={styles.subImg} />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.daysLeft, { color: COLORS.primary }]}>
              {sub.daysLeft}
            </Text>

            <Text style={[styles.subTitle, { color: theme.text }]}>
              {sub.title}
            </Text>

            <Text style={[styles.subMeta, { color: '#666' }]}>{sub.restaurant}</Text>

            <Text style={[styles.subPrice, { color: theme.text }]}>
              {sub.price}
            </Text>

            <Text style={[styles.subDuration, { color: '#666' }]}>{sub.duration}</Text>
          </View>
        </View>

        {/* MEAL ROW */}
        <View style={[styles.mealRow, { backgroundColor: theme.cardBackground }]}>
          {["Breakfast", "Lunch", "Dinner"].map((m, idx) => (
            <View style={styles.mealGroup} key={m}>
              <Image
                source={require("../../../assets/tick.png")}
                style={styles.tick}
              />

              <Text style={[styles.mealText, { color: COLORS.primary }]}>
                {m}
              </Text>

              {idx < 2 && (
                <Image
                  source={require("../../../assets/rightarrow.png")}
                  style={styles.arrowIcon}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ActiveOrders;

const styles = StyleSheet.create({
  subCard: {
    borderRadius: 14,

  },

  subTopRow: { flexDirection: "row", alignItems: "center" },

  subImg: { width: 150, height: 150, borderRadius: 10 },

  daysLeft: {
    fontSize: 13,
    fontFamily: getFontFamily("Bold"),
    fontWeight: getFontWeight("Bold"),
  },

  subTitle: {
    fontSize: 15,
    fontFamily: getFontFamily("Medium"),
    fontWeight: getFontWeight("Medium"),
  },

  subMeta: {
    fontSize: 12,
    fontFamily: getFontFamily("Medium"),
    fontWeight: getFontWeight("Medium"),
  },

  subPrice: {
    fontSize: 13,
    fontFamily: getFontFamily("Medium"),
    fontWeight: getFontWeight("Medium"),
  },

  subDuration: {
    fontSize: 12,
    fontFamily: getFontFamily("Medium"),
    fontWeight: getFontWeight("Medium"),
  },

  mealRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 8,
  },

  mealGroup: { flexDirection: "row", alignItems: "center" },

  tick: { width: 16, height: 16, marginRight: 4 },

  mealText: {
    fontSize: 13,
    fontFamily: getFontFamily("SemiBold"),
    fontWeight: getFontWeight("SemiBold"),
  },

  arrowIcon: { width: 5, height: 8, marginLeft: 6 },

});


