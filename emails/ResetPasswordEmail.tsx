import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
} from "react-email";

interface Props {
  name?: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({ name, resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Tamworth Hub password</Preview>
      <Body style={{ backgroundColor: "#f8fafc", padding: 24 }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: 32,
            borderRadius: 12,
          }}
        >
          <Heading>Reset your password</Heading>

          <Text>Hi {name || "there"},</Text>

          <Text>
            We received a request to reset your Tamworth Hub account password.
          </Text>

          <Button
            href={resetUrl}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: 8,
            }}
          >
            Reset Password
          </Button>

          <Text>This link expires in 1 hour.</Text>

          <Text>
            If you didn&apos;t request this, you can safely ignore this email.
          </Text>

          <Hr />
          <Text>Tamworth Hub</Text>
        </Container>
      </Body>
    </Html>
  );
}
