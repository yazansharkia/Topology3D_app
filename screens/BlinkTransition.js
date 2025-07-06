//import { Animated, Easing } from 'react-native';
//import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
//
//const blinkTransition = {
//  gestureDirection: 'horizontal',
//  transitionSpec: {
//    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
//    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
//  },
//  cardStyleInterpolator: ({ current, next, layouts }) => {
//    return {
//      cardStyle: {
//        opacity: current.progress,
//      },
//    };
//  },
//};
//
//export default blinkTransition;

// blinkTransition.js
//import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
//
//const blinkTransition = {
//  gestureDirection: 'horizontal',
//  transitionSpec: {
//    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
//    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
//  },
//  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
//};
//
//export default blinkTransition;



// blinkTransition.js
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing } from 'react-native';

const blinkTransition = {
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 200,
        easing: Easing.linear,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 200,
        easing: Easing.linear,
      },
    },
  },
  cardStyleInterpolator: ({ current }) => {
    const opacity = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      cardStyle: {
        opacity,
      },
    };
  },
};

export default blinkTransition;
