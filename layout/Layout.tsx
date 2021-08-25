import Header from "@itmecho/layout/Header";
import { Container } from "@mantine/core";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Header />
      <main style={{ flexGrow: 1, height: "100%" }}>{children}</main>
    </Container>
  );
}
