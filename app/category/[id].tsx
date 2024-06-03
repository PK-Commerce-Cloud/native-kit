import EmptyList from "@/components/commerce/empty-list";
import Loading from "@/components/commerce/loading";
import { useCommerceKit } from "@/lib/providers/commcer-provider";
import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { H1, Paragraph, ScrollView } from "tamagui";

export default function CategoryShow() {
  const { id } = useGlobalSearchParams();

  const navigation = useNavigation();
  const { shopperProducts } = useCommerceKit();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const data = shopperProducts.getCategory({
        parameters: {
          id: id,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [isSuccess]);

  if (isLoading) return <Loading fullscreen />;

  if (!data) return <EmptyList isLoading={isLoading} />;

  return (
    <ScrollView>
      {data.categories?.map((category) => {
        return <Paragraph key={category.id}>{category.name}</Paragraph>;
      })}
    </ScrollView>
  );
}
