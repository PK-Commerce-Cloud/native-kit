import { StyleSheet, FlatList, SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useCommerceKit } from "@/lib/providers/commcer-provider";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { shopperSearch } = useCommerceKit();

  const { data } = useQuery({
    queryKey: ["homeSearch"],
    queryFn: async () => {
      console.log('homeSearch', new Date());
      const data = await shopperSearch?.productSearch({
        parameters: { q: "dress", limit: 8 },
      });
      return data;
    },
    enabled: shopperSearch != undefined,
  });

  return (
    <SafeAreaView>
      {data && (
        <FlatList
          data={data.hits}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => {
            return <ThemedText>{item.productName}</ThemedText>;
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
