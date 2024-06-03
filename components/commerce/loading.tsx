import { Spinner, YStack, YStackProps } from "tamagui";

interface LoadingProps extends YStackProps {}

export default function Loading({ ...props }: LoadingProps) {
  {
    return (
      <YStack justifyContent="center" alignItems="center" {...props}>
        <Spinner />
      </YStack>
    );
  }
}
