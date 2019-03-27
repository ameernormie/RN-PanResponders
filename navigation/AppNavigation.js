import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Basic from "../screens/Basic/BasicImplementatiion";
import BasicWithDecay from "../screens/BasicWithDecay/BasicWithDecay";
import UnderstandingCapture from "../screens/UnderstandingCapture/UnderstatndingCapture";
import KittenCards from "../screens/KittenCards/KittenCards";
import StaggeredHead from "../screens/StaggeredHead/StaggeredHead";
import StackingCards from "../screens/StackingCards/StackingCards";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Basic: {
      screen: Basic
    },
    BasicWithDecay: {
      screen: BasicWithDecay
    },
    UnderstandingCapture: {
      screen: UnderstandingCapture
    },
    KittenCards: {
      screen: KittenCards
    },
    StaggeredHeads: {
      screen: StaggeredHead
    },
    StackingCards: {
      screen: StackingCards
    }
  },

  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
