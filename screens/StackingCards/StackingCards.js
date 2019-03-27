import React from "react";
import { View, Text, StyleSheet } from "react-native";

class StackingCards extends React.Component {
  state = {
    items: [
      {
        id: 1,
        name: "Ameer"
      },
      {
        id: 2,
        name: "Ali"
      },
      {
        id: 3,
        name: "Ammaar"
      },
      {
        id: 4,
        name: "Talha"
      },
      {
        id: 5,
        name: "Hamza"
      },
      {
        id: 6,
        name: "Umar"
      }
    ]
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StackingCards;
