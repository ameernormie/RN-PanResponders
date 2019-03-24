import React from "react";
import { Animated, View, PanResponder } from "react-native";

class BasicWithDecay extends React.Component {
  state = {
    animation: new Animated.ValueXY()
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) => true,
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (e, { vx, vy }) => {
        Animated.decay(this.state.animation, {
          velocity: { x: vx, y: vy },
          deceleration: 0.977
        }).start();
      }
    });
  }

  render() {
    const { animation } = this.state;
    const animatedStyle = {
      transform: animation.getTranslateTransform()
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={[
            { height: 100, width: 100, backgroundColor: "tomato" },
            animatedStyle
          ]}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

export default BasicWithDecay;
