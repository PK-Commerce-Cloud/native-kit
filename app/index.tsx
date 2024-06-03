import SafeStack from "@/components/Stack";
import {
  Button,
  H4,
  H5,
  Input,
  Paragraph,
  ScrollView,
  Separator,
  XStack,
  YStack,
} from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useCommerceKit } from "@/lib/providers/commcer-provider";
import EmptyList from "@/components/commerce/empty-list";
import currency from "currency.js";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { tw } from "@/lib/utils";

export default function Index() {
  const { shopperSearch, shopperProducts } = useCommerceKit();

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const data = await shopperSearch.productSearch({
        parameters: { q: "dress", limit: 8 },
      });
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await shopperProducts.getCategory({
        parameters: {
          id: "root",
          levels: 1,
        },
      });
      return data;
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeStack gap="$4">
        <YStack marginHorizontal="$4" marginTop="$4" gap="$4">
          <Input placeholder="Search" />
          <XStack justifyContent="space-between" alignItems="center">
            <H4 textTransform="capitalize">Categories</H4>
            <Paragraph>View all</Paragraph>
          </XStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$4">
              {categories?.categories?.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={{
                      pathname: "/category/[id]",
                      params: {
                        id: category.id,
                      },
                    }}
                    asChild
                  >
                    <Button>{category.name}</Button>
                  </Link>
                );
              })}
            </XStack>
          </ScrollView>
        </YStack>

        <FlashList
          data={data?.hits || []}
          ListEmptyComponent={() => (
            <EmptyList isLoading={isLoading}></EmptyList>
          )}
          estimatedItemSize={250}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <Link
                href={{
                  pathname: "/product/[id]",
                  params: {
                    id: item.productId,
                  },
                }}
                asChild
              >
                <TouchableOpacity style={tw`flex-1 flex p-4`}>
                  <YStack flex={1}>
                    <Image
                      style={{
                        height: 200,
                        width: "100%",
                      }}
                      source={item.image?.disBaseLink}
                      contentFit="cover"
                      transition={1000}
                    />
                    <Paragraph>{item.productName}</Paragraph>
                    <Paragraph>{currency(item.price || 0).format()}</Paragraph>
                  </YStack>
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      </SafeStack>
    </ScrollView>
  );
}
