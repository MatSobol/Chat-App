import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CustomText } from "@/components/text";
import { CustomTextInput } from "@/components/textInput";
import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const FriendElement = ({
  text,
  index,
  remove,
}: {
  text: string;
  index: number;
  remove: (index: number) => void;
}) => {
  return (
    <View style={{ paddingBlockStart: 10 }}>
      <Card>
        <Ionicons
          name={"person-circle-outline"}
          color={Colors.text}
          size={38}
        />
        <CustomText text={text} fontSize={18} />
        <View
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{ width: 90, display: "flex", justifyContent: "center" }}
          >
            <Button
              icon="person-add-sharp"
              text="Accept"
              size={16}
              onClick={() => remove(index)}
            />
          </View>
          <Pressable onTouchEnd={() => remove(index)}>
            <Ionicons
              style={{ marginLeft: "auto" }}
              name={"close"}
              color={Colors.danger}
              size={28}
            />
          </Pressable>
        </View>
      </Card>
    </View>
  );
};

export default function FriendScreen() {
  const [filter, setFilter] = useState("");

  const friendsTemp = [
    "AceHunter",
    "BunnySpark",
    "SparkyNova",
    "ShadowWalker",
    "LunaMoon",
    "BlazeStorm",
    "PixieDust",
    "RockyRoad",
    "NovaPrime",
    "ChipMaster",
    "EchoWave",
    "ZiggyStar",
    "FrostBite",
    "SunnySide",
    "RavenClaw",
    "BoltRunner",
    "KiwiCrusher",
    "GhostRider",
    "CometTrail",
    "ScoutLeaderXD",
  ];

  const [friends, setFriends] = useState(friendsTemp);

  const remove = (index: number) => {
    setFriends((prev) => prev.filter((_, idx) => idx !== index));
  };

  const listFooterComponent = () => {
    return <ActivityIndicator size="large" />;
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        icon="search"
        value={filter}
        onChangeHandle={setFilter}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        data={friends.filter((item) => item.startsWith(filter))}
        renderItem={({ item, index }) => (
          <FriendElement text={item} index={index} remove={remove} />
        )}
        keyExtractor={(item) => item}
        ListFooterComponent={listFooterComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBlockStart: 8,
    paddingInline: 10,
    flex: 1,
  },
});
