import { Card, CardHeader, Paragraph, Spinner } from "tamagui";

export default function EmptyList({ isLoading }: { isLoading: boolean }) {
  return (
    <Card>
      <CardHeader>
        {isLoading ? <Spinner /> : <Paragraph>Empty</Paragraph>}
      </CardHeader>
    </Card>
  );
}
