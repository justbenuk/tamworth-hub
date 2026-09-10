import { Html, Head, Body } from "react-email";
import * as React from "react";

export default function ChangePasswordEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body>
        <h1 style={{ fontStyle: "bold" }}>Hi {name}</h1>
        <p>
          We wanted to let you know that someone has changed your password. If
          this wasn&apos;t you? Please contact us
        </p>
      </Body>
    </Html>
  );
}
