"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  rem,
  Tooltip,
  TextInput,
  PasswordInput,
  Center,
  Text,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck } from "@tabler/icons-react";

import { IconInfoCircle } from "@tabler/icons-react";

export default function Home() {
  const clipboard = useClipboard();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  // const [username,setUsername] = useState("")

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((res) => res.json())
        .then(function (res) {
          setForm((state) => {
            return {
              ...state,
              username: res.username,
              email: res.email,
            };
          });
          // setUsername(res.username);
          setLoading(false);
        });
    }
    getData();
  }, []);

  function onFormChange(event: React.FormEvent<EventTarget>) {
    const target = event.target as HTMLInputElement;
    setForm((state) => {
      return {
        ...state,
        [target.name]: target.value,
      };
    });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      alert("email badly formated!");
      return;
    }

    if (form.password != form.confirmpassword) {
      alert("password not match!");
      return;
    }

    var body = { ...form };
    // delete body.confirmpassword;

    var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });

    var json = await response.json();
    console.log(json);
  }
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size="1.1rem" stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <form
      style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}
      onSubmit={onSubmit}
    >
      {/* <span>{JSON.stringify(form)}</span> */}

      <TextInput
        rightSection={rightSection}
        label="Username"
        placeholder="username"
        name="username"
        value={form.username}
        onChange={onFormChange}
      />

      {/* <input
        type="text"
        name="username"
        value={form.username}
        onChange={onFormChange}
      /> */}

      <input
        type="text"
        name="email"
        value={form.email}
        onChange={onFormChange}
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={onFormChange}
      />

      <input
        type="password"
        name="confirmpassword"
        value={form.confirmpassword}
        onChange={onFormChange}
      />
      <Tooltip
        label="Link copied!"
        offset={5}
        position="bottom"
        radius="xl"
        transitionProps={{ duration: 100, transition: "slide-down" }}
        opened={clipboard.copied}
      >
        <Button
          variant="light"
          rightIcon={
            clipboard.copied ? (
              <IconCheck size="1.2rem" stroke={1.5} />
            ) : (
              <IconCopy size="1.2rem" stroke={1.5} />
            )
          }
          radius="xl"
          size="md"
          styles={{
            root: { paddingRight: rem(14), height: rem(48) },
            rightIcon: { marginLeft: rem(22) },
          }}
          type="submit"
          // onClick={() =>
          //   clipboard.copy("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
          // }
        >
          Submit
        </Button>
      </Tooltip>
      {/* <button>Submit</button> */}
      {/* <InputComponent value={form} onChange={}/> */}
    </form>
  );
}

// interface InputComponentInterface {
//   value: string;
//   onChange:
// }

// function InputComponent() {
// }
