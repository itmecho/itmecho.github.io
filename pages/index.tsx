import { Center, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center style={{ height: "100%" }}>
      <div style={{ paddingBottom: "200px" }}>
        <Title align="center" style={{ fontSize: "4rem" }}>
          Hi, I'm Iain
        </Title>
        <Text align="center" size="lg">
          A Software Engineer with a DevOps background
        </Text>
      </div>
    </Center>
  );
}
