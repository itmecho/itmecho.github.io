import { NextLink } from "@itmecho/components/NexLink";
import {
  Container,
  Grid,
  Title,
  theming,
  Col,
  Burger,
  Menu,
  MenuItem,
  Group,
  Button,
  Anchor,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(
  (theme) => ({
    brand: {
      fontFamily: "Expletus Sans",
      cursor: "pointer",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: theme.spacing.lg,
    },
  }),
  { theming }
);

const navigationLinks = [{ text: "Blog", href: "#" }];

export default function Header() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");

  return (
    <div className={classes.container}>
      <Link href="/">
        <Title className={classes.brand}>itmecho.com</Title>
      </Link>
      {matches ? (
        <Group>
          {navigationLinks.map(({ text, href }) => (
            <Anchor color="indigo" component={NextLink} href={href}>
              {text}
            </Anchor>
          ))}
        </Group>
      ) : (
        <Menu>
          {navigationLinks.map(({ text, href }) => (
            <MenuItem component={NextLink} href={href}>
              {text}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
