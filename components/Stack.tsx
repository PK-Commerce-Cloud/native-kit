import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack, YStackProps } from "tamagui";

interface SafeStackProps extends YStackProps {}

export default function SafeStack(props: SafeStackProps) {
  const { top, bottom } = useSafeAreaInsets();

  return <YStack marginTop={top} marginBottom={bottom} {...props} />;
}
