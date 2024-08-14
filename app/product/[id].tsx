import Loading from "@/components/commerce/loading";
import VariantSelector from "@/components/commerce/variant-selector";
import { useCommerceKit } from "@/lib/providers/commcer-provider";
import { tw } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import currency from "currency.js";
import { Image } from "expo-image";
import { useGlobalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, H5, Paragraph, ScrollView, XStack, YStack } from "tamagui";

export default function ProductShow() {
  const { id } = useGlobalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const { shopperProducts } = useCommerceKit();

  const { data, isLoading } = useQuery({
    queryKey: ["product", { id }],
    queryFn: async () => {
      const data = await shopperProducts.getProduct({
        parameters: {
          id: id,
          allImages: true,
        },
      });
      return data;
    },
  });

  if (isLoading || !data) return <Loading fullscreen />;

  return (
    <YStack fullscreen marginBottom={bottom} marginHorizontal="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$4" marginTop="$4" marginBottom="$8">
          <Image
            source={data?.imageGroups?.[0].images[0].disBaseLink}
            style={tw`w-full h-auto aspect-square rounded-3xl`}
          />

          <H5>{data?.name}</H5>
          <Paragraph numberOfLines={4}>{data?.longDescription}</Paragraph>

          {data.variationAttributes?.map((variantAttribute) => {
            return (
              <VariantSelector
                key={variantAttribute.id}
                values={variantAttribute.values}
                type={variantAttribute.id}
                title={variantAttribute.name || variantAttribute.id}
              />
            );
          })}
        </YStack>
      </ScrollView>
      <XStack justifyContent="space-between" alignItems="center">
        <Paragraph size="$8">{currency(data?.price || 0).format()}</Paragraph>
        <Button size="$5">Add to cart</Button>
      </XStack>
    </YStack>
  );
}
