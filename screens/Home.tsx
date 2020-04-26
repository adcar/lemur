import { Button, Text, View } from "react-native";
import * as React from "react";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Just communities youre subscribed to </Text>
      <Button
        title="Go to Other"
        onPress={() => navigation.navigate("Other")}
      />
    </View>
  );
}
