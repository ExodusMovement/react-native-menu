import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MenuView, type MenuComponentRef } from "@exodus/react-native-menu";
import { useRef } from "react";

export const App = () => {
  const [themeVariant] = React.useState<string | undefined>("light");
  const menuRef = useRef<MenuComponentRef>(null);

  return (
    <View style={styles.container}>
      <MenuView
        ref={menuRef}
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: "add",
            title: "Add to List",
            image: "plus",
            imageColor: "#2367A2",
            subactions: [
              {
                id: "nested1",
                title: "Nested action",
                subtitle: "State is mixed",
                image: "heart.fill",
                imageColor: "rgba(100,200,250,0.3)",
                state: "mixed",
              },
              {
                id: "nestedDestructive",
                title: "Destructive Action",
                attributes: {
                  destructive: true,
                },
                image: "trash",
              },
            ],
          },
          {
            id: "share",
            title: "Share Action",
            subtitle: "Share action on SNS",
            image: "square.and.arrow.up",
            imageColor: "#46F289",
            state: "on",
          },
          {
            id: "mixed",
            title: "Mixed State",
            subtitle: "State is mixed",
            image: "heart.fill",
            imageColor: "rgba(100,200,250,0.3)",
            state: "mixed",
            subactions: [
              {
                id: "nested2",
                title: "Nested action",
                subtitle: "State is mixed",
                image: "tray",
                imageColor: "rgba(100,200,250,0.3)",
                state: "mixed",
              },
              {
                id: "nestedMixed",
                title: "Mixed State",
                subtitle: "State is mixed",
                image: "heart.fill",
                imageColor: "#46F289",
                subactions: [
                  {
                    id: "nestednesteddisabled",
                    title: "Disabled Action",
                    subtitle: "Action is disabled",
                    attributes: {
                      disabled: true,
                    },
                    image: "tray",
                  },
                  {
                    id: "nestednestedhidden",
                    title: "Hidden Action",
                    subtitle: "Action is hidden",
                    attributes: {
                      hidden: true,
                    },
                  },
                  {
                    id: "nestednesteddestructive",
                    title: "Destructive Action",
                    attributes: {
                      destructive: true,
                    },
                    image: "trash",
                  },
                ],
              },
            ],
          },
          {
            id: "disabled",
            title: "Disabled Action",
            subtitle: "Action is disabled",
            attributes: {
              disabled: true,
            },
            image: "tray",
          },
          {
            id: "hidden",
            title: "Hidden Action",
            subtitle: "Action is hidden",
            attributes: {
              hidden: true,
            },
          },
          {
            id: "destructive",
            title: "Destructive Action",
            attributes: {
              destructive: true,
            },
            image: "trash",
          },
        ]}
        themeVariant={themeVariant}
        testID="menuView"
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Test</Text>
        </View>
      </MenuView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    height: 100,
    width: 100,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white" },
});
