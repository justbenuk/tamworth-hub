import { Html, Head, Body } from "react-email";

export default function VerifyEmail({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <Html>
      <Head />
      <Body>
        <h1 style={{ fontStyle: "bold" }}>Hi {name}</h1>
        <p>
          Click the link to verify your email: <a href={url}>Verify Email</a>
        </p>
      </Body>
    </Html>
  );
}
