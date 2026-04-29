import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  scope?: string;
  budget?: string;
  message: string;
  submittedAt: string;
  ip?: string;
};

const BONE = "#f6f3ec";
const INK = "#0c0e1a";
const COBALT = "#3358e8";
const FOG = "#7a7f95";

const styles = {
  body: { backgroundColor: BONE, color: INK, fontFamily: "Georgia, 'Times New Roman', serif", margin: 0, padding: 0 },
  container: { maxWidth: 640, margin: "0 auto", padding: "48px 32px" },
  kicker: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: FOG,
    margin: "0 0 16px",
  },
  h1: { fontSize: 40, lineHeight: "1.05", margin: "0 0 8px", fontWeight: 400 as const, letterSpacing: "-0.02em" },
  h1Accent: { color: COBALT, fontStyle: "italic" as const },
  meta: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 12,
    color: FOG,
    margin: "32px 0 0",
  },
  rule: { border: "none", borderTop: `1px solid ${INK}1a`, margin: "32px 0" },
  label: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: FOG,
    margin: "0 0 6px",
  },
  value: { fontFamily: "Helvetica, Arial, sans-serif", fontSize: 16, color: INK, margin: "0 0 24px", lineHeight: 1.5 },
  message: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
    color: INK,
    whiteSpace: "pre-wrap" as const,
    margin: 0,
  },
  footer: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: FOG, margin: "48px 0 0" },
};

export default function ContactNotification({
  name,
  email,
  company,
  scope,
  budget,
  message,
  submittedAt,
  ip,
}: ContactPayload) {
  return (
    <Html>
      <Head />
      <Preview>{`New memo request — ${name}${company ? ` · ${company}` : ""}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.kicker}>New memo request</Text>
          <Heading style={styles.h1}>
            {name}{" "}
            <span style={styles.h1Accent}>wants to talk.</span>
          </Heading>

          <Hr style={styles.rule} />

          <Section>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            {company ? (
              <>
                <Text style={styles.label}>Company</Text>
                <Text style={styles.value}>{company}</Text>
              </>
            ) : null}

            {scope ? (
              <>
                <Text style={styles.label}>Scope</Text>
                <Text style={styles.value}>{scope}</Text>
              </>
            ) : null}

            {budget ? (
              <>
                <Text style={styles.label}>Budget</Text>
                <Text style={styles.value}>{budget}</Text>
              </>
            ) : null}

            <Text style={styles.label}>Message</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Hr style={styles.rule} />

          <Text style={styles.meta}>
            submitted {submittedAt}
            {ip ? ` · ip ${ip}` : ""}
          </Text>
          <Text style={styles.footer}>BrainOn · contact pipeline</Text>
        </Container>
      </Body>
    </Html>
  );
}
