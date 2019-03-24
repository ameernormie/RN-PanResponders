import React from "react";
import { Animated, View, PanResponder } from "react-native";

class Basic extends React.Component {
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
      onPanResponderMove: (e, gesture) => {
        this.state.animation.setValue({ x: gesture.dx, y: gesture.dy });
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

export default Basic;
