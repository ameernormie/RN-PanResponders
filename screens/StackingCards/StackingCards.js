import React from "react";
import { Animated, View, Text, StyleSheet, PanResponder } from "react-native";

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
    ],
    animation: new Animated.Value(0)
  };

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this.state.animation
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        this.state.animation.setValue(0);
      }
    });
  }

  render() {
    const animatedStyle = {
      transform: [{ translateY: this.state.animation }]
    };

    return (
      <View style={styles.container}>
        {this.state.items.map((item, index) => {
          return (
            <Animated.View
              key={index}
              style={[styles.card, animatedStyle]}
              {...this.panResponder.panHandlers}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: "#eee"
  }
});

export default StackingCards;
