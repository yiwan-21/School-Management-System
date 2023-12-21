import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Button,
  Heading,
  Text,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaChalkboard } from "react-icons/fa";

const ClassItems = ({ classid, target }) => {
  return (
    <Link className="linker" to={target}>
      <Card variant="filled">
        <CardBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <FaChalkboard size={100} color="#3182CE" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{classid}</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ClassItems;
