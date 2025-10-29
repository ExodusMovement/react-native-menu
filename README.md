# @exodus/react-native-menu

![Supports iOS][support-badge]![Github Action Badge][gha-badge] ![npm][npm-badge]

iOS14+ UIMenu components for react-native.
Falls back to ActionSheet for versions below iOS14.

| iOS 14+                                                                                                                        | iOS 13                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/6936373/112418272-80b10000-8d6c-11eb-9edb-f91eeff0877e.png" width="320" /> | <img src="https://user-images.githubusercontent.com/6936373/98471162-cb9f0080-222d-11eb-89ef-9342a1f10893.png" width="320" /> |

## Installation

via npm:

```sh
npm install @exodus/react-native-menu
```

via yarn:

```sh
yarn add @exodus/react-native-menu
```

### Installing on iOS with React Native 0.63 and above

There is an issue(https://github.com/facebook/react-native/issues/29246) causing projects with this module to fail on build on React Native 0.63 and above.
This issue may be fixed in future versions of react native.
As a work around, look for lines in `[YourPrject].xcodeproj` under `LIBRARY_SEARCH_PATHS` with `"\"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)\"",` and change `swift-5.0` to `swift-5.3`.

## Linking

The package is [automatically linked](https://github.com/react-native-community/cli/blob/master/autolinking.md) when building the app. All you need to do is:

```sh
npx pod-install
```

## Usage

```jsx
import { MenuView, MenuComponentRef } from "@exodus/react-native-menu";

const App = () => {
  const menuRef = useRef < MenuComponentRef > null;
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
            title: "Add",
            titleColor: "#2367A2",
            image: "plus",
            imageColor: "#2367A2",
            subactions: [
              {
                id: "nested1",
                title: "Nested action",
                titleColor: "rgba(250,180,100,0.5)",
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
            titleColor: "#46F289",
            subtitle: "Share action on SNS",
            image: "square.and.arrow.up",
            imageColor: "#46F289",
            state: "on",
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
        shouldOpenOnLongPress={false}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Test</Text>
        </View>
      </MenuView>
    </View>
  );
};
```

### Declarative usage

It's also possible to obtain the `action` is a more React-ish, declarative fashion. Refer to the [`react-to-imperative`](https://github.com/vonovak/react-to-imperative?tab=readme-ov-file#why) package, and see an example [here](https://github.com/vonovak/react-navigation-header-buttons/blob/cca6ce6d04d3b106efe7aa62279101db33c7941b/example/src/screens/UsageNativeMenu.tsx#L62).

## Reference

### Props

### `title` (iOS only)

The title of the menu.

| Type   | Required |
| ------ | -------- |
| string | Yes      |

### `shouldOpenOnLongPress`

Boolean determining if menu should open after long press or on normal press

| Type    | Required |
| ------- | -------- |
| boolean | No       |

### `actions`

Actions to be displayed in the menu.

| Type         | Required |
| ------------ | -------- |
| MenuAction[] | Yes      |

### `themeVariant` (iOS only)

String to override theme of the menu. If you want to control theme universally across your app, [see this package](https://github.com/vonovak/react-native-theme-control).

| Type                  | Required |
| --------------------- | -------- |
| enum('light', 'dark') | No       |

#### `MenuAction`

Object representing Menu Action.

```ts
export type MenuAction = {
  /**
   * Identifier of the menu action.
   * The value set in this id will be returned when menu is selected.
   */
  id?: string;
  /**
   * The action's title.
   */
  title: string;
  /**
   * (iOS14+ only)
   * An elaborated title that explains the purpose of the action.
   * @platform iOS
   */
  subtitle?: string;
  /**
   * The attributes indicating the style of the action.
   */
  attributes?: MenuAttributes;
  /**
   * (iOS14+ only)
   * The state of the action.
   * @platform iOS
   */
  state?: MenuState;
  /**
   * (iOS13+ only)
   * - The action's image.
   * - Allows icon name included in SF Symbol
   * @example
   * image="plus"
   */
  image?: string;
  /**
   * (iOS13+ only)
   * - The action's image color.
   */
  imageColor?: number | ColorValue;
  /**
   * (iOS14+ only)
   * - Actions to be displayed in the sub menu
   */
  subactions?: MenuAction[];
};
```

#### `MenuAttributes`

The attributes indicating the style of the action.

```ts
type MenuAttributes = {
  /**
   * An attribute indicating the destructive style.
   */
  destructive?: boolean;
  /**
   * An attribute indicating the disabled style.
   */
  disabled?: boolean;
  /**
   * An attribute indicating the hidden style.
   */
  hidden?: boolean;
};
```

#### `MenuState`

The state of the action.

```ts
/**
 * The state of the action.
 * - off: A constant indicating the menu element is in the "off" state.
 * - on: A constant indicating the menu element is in the "on" state.
 * - mixed: A constant indicating the menu element is in the "mixed" state.
 */
type MenuState = "off" | "on" | "mixed";
```

### `onPressAction`

Callback function that will be called when selecting a menu item.
It will contain id of the given action.

| Type                    | Required |
| ----------------------- | -------- |
| ({nativeEvent}) => void | No       |

### Events

#### `onCloseMenu`

Callback function that will be called when the menu is dismissed. This event fires at the start of the dismissal, before any animations complete.

| Type       | Required |
| ---------- | -------- |
| () => void | No       |

#### `onOpenMenu`

Callback function that will be called when the menu is opened. This event fires right before the menu is displayed.

| Type       | Required |
| ---------- | -------- |
| () => void | No       |

Example usage:

```jsx
<MenuView
  onOpenMenu={() => {
    console.log("Menu was opened");
  }}
  onCloseMenu={() => {
    console.log("Menu was closed");
  }}
>
  <View>
    <Text>Open Menu</Text>
  </View>
</MenuView>
```

## Testing with Jest

In some cases, you might want to mock the package to test your components. You can do this by using the `jest.mock` function.

```ts
import type { MenuComponentProps } from "@exodus/react-native-menu";

jest.mock("@exodus/react-native-menu", () => ({
  MenuView: jest.fn((props: MenuComponentProps) => {
    const React = require("react");

    class MockMenuView extends React.Component {
      render() {
        return React.createElement(
          "View",
          { testID: props.testID },
          props.actions.map((action) =>
            React.createElement("Button", {
              key: action.id,
              title: action.title,
              onPress: () => {
                if (action.id && props?.onPressAction) {
                  props.onPressAction({ nativeEvent: { event: action.id } });
                }
              },
              testID: action.id,
            })
          ),
          this.props.children
        );
      }
    }

    return React.createElement(MockMenuView, props);
  }),
}));
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

[gha-badge]: https://github.com/exodus-io/react-native-menu/workflows/Build/badge.svg
[npm-badge]: https://img.shields.io/npm/v/@exodus/react-native-menu.svg?style=flat-square
[support-badge]: https://img.shields.io/badge/platforms-ios-lightgrey.svg?style=flat-square
