import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import useActionCable from "./src/hooks/useActionCable";
import useChannel from "./src/hooks/useChannel";

export default function App() {
  const { actionCable } = useActionCable("ws://192.168.0.108:3000/cable");
  const { subscribe, unsubscribe, send } = useChannel(actionCable);
  const [data, setData] = useState(null);

  useEffect(() => {
    subscribe(
      { channel: "chat_channel" },
      {
        received: (x) => setData(x),
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 100,
      }}
    >
      <Text>{JSON.stringify(data)}</Text>
      <Button
        title="Click!"
        onPress={() => send("click", { time: Date.now() })}
      />
    </View>
  );
}
