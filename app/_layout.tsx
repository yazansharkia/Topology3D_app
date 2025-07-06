import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
          <Stack.Screen name="index" options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="RegisterScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="InstructionsScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="HomeScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="ScanInfoScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="ScanCameraScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="ViewVideoScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="CompleteScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="CameraCalibrationScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="CalibrationInfoScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="ScalingCameraScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
          <Stack.Screen name="ScalingInfoScreen"options={{ headerTitle: '' }, { headerShown: false }}/>
      </Stack>
  );
}



