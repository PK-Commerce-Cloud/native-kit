import { VariationAttributeTypes } from "@/lib/enums";
import { tw } from "@/lib/utils";
import { ShopperProductsTypes } from "commerce-sdk-isomorphic";
import { Paragraph, View, XStack, YStack } from "tamagui";
import { useDeviceContext } from "twrnc";

interface VariantSelectorProps {
  title: string;
  values?: ShopperProductsTypes.VariationAttributeValue[];
  type: string;
}

export default function VariantSelector({
  title,
  values,
  type,
}: VariantSelectorProps) {
  /* Context for Tailwind Light/Dark */
  useDeviceContext(tw);

  return (
    <YStack gap="$2">
      <Paragraph>{title}</Paragraph>
      <XStack flex={1} flexWrap="wrap" gap="$2">
        {values?.map((value) => {
          if (type === VariationAttributeTypes.COLOR) {
            return (
              <YStack key={value.value} justifyContent="center">
                <View style={tw`h-9 w-9 bg-red-400 rounded-md`} />
                <Paragraph>{value.value}</Paragraph>
              </YStack>
            );
          }

          return (
            <View
              key={value.value}
              style={tw`p-2 rounded-md border dark:border-white`}
            >
              <Paragraph>{value.value}</Paragraph>
            </View>
          );
        })}
      </XStack>
    </YStack>
  );
}
