import React from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder
} from "react-native";
import cat1 from "./../../assets/images/cat1.jpeg";
import cat2 from "./../../assets/images/cat2.jpg";
import cat3 from "./../../assets/images/cat3.jpeg";
import cat4 from "./../../assets/images/cat4.jpeg";

import clamp from "clamp";

const SWIPE_THRESHOLD = 200;

class KittenCards extends React.Component {
  state = {
    animation: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    next: new Animated.Value(0.9),
    items: [
      {
        image: cat1,
        id: 0,
        text: "Cat Number One"
      },
      {
        image: cat2,
        id: 1,
        text: "Cat Number Two"
      },
      {
        image: cat3,
        id: 2,
        text: "Cat Number Three"
      },
      {
        image: cat4,
        id: 3,
        text: "Cat Number Four"
      }
    ]
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.997
          }).start(this.transitionNext);
        } else {
          Animated.spring(this.state.animation, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  transitionNext = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300
      }),
      Animated.spring(this.state.next, {
        toValue: 1,
        friction: 4
      })
    ]).start(() =>
      this.setState(
        ({ items }) => ({ items: items.slice(1) }),
        () => {
          this.state.next.setValue(0.9);
          this.state.opacity.setValue(1);
          this.state.animation.setValue({ x: 0, y: 0 });
        }
      )
    );
  };

  handleNo = () => {
    Animated.timing(this.state.animation.x, {
      toValue: -SWIPE_THRESHOLD
    }).start(this.transitionNext);
  };

  handleYes = () => {
    Animated.timing(this.state.animation.x, {
      toValue: SWIPE_THRESHOLD
    }).start(this.transitionNext);
  };

  render() {
    const { animation, opacity } = this.state;
    const rotate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"],
      extrapolate: "clamp"
    });

    const opacityInterpolation = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp"
    });

    const animatedCardStyles = {
      opacity,
      transform: [
        {
          rotate
        },
        ...animation.getTranslateTransform()
      ]
    };

    const animatedImageStyles = {
      opacity: opacityInterpolation
    };

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this.state.items
            .slice(0, 2)
            .reverse()
            .map(({ image, id, text }, index, items) => {
              const isLastItem = index === items.length - 1;
              const isSecondtoLast = index === items.length - 2;

              const panHandlers = isLastItem
                ? this._panResponder.panHandlers
                : {};

              const cardStyle = isLastItem ? animatedCardStyles : undefined;
              const imageStyle = isLastItem ? animatedImageStyles : undefined;
              const nextStyle = isSecondtoLast
                ? { transform: [{ scale: this.state.next }] }
                : undefined;
              return (
                <Animated.View
                  style={[styles.card, cardStyle, nextStyle]}
                  key={id}
                  {...panHandlers}
                >
                  <Animated.Image
                    style={[styles.image, imageStyle]}
                    source={image}
                    resize="cover"
                  />
                  <View>
                    <Text style={[styles.lowerText]}>{text}</Text>
                  </View>
                </Animated.View>
              );
            })}
        </View>
        <View style={styles.buttonBar}>
          <TouchableOpacity
            onPress={this.handleNo}
            style={[styles.button, styles.nopeButton]}
          >
            <Text style={styles.nopeText}>NO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleYes}
            style={[styles.button, styles.yupButton]}
          >
            <Text style={styles.yupText}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  card: {
    width: 300,
    height: 300,
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 1,
    borderRadius: 3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#fff"
  },
  image: {
    width: null,
    height: null,
    flex: 3,
    borderRadius: 2
  },
  lowerText: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5
  },
  yupButton: {
    shadowColor: "green"
  },
  nopeButton: {
    shadowColor: "red"
  }
});

export default KittenCards;
