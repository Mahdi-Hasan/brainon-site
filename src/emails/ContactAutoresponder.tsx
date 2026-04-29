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

const BONE = "#f6f3ec";
const INK = "#0c0e1a";
const COBALT = "#3358e8";
const FOG = "#7a7f95";

const styles = {
  body: { backgroundColor: BONE, color: INK, fontFamily: "Georgia, 'Times New Roman', serif", margin: 0, padding: 0 },
  container: { maxWidth: 640, margin: "0 auto", padding: "56px 32px" },
  kicker: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: FOG,
    margin: "0 0 20px",
  },
  h1: { fontSize: 44, lineHeight: "1.02", margin: "0 0 24px", fontWeight: 400 as const, letterSpacing: "-0.02em" },
  italic: { fontStyle: "italic" as const, color: COBALT },
  p: { fontFamily: "Helvetica, Arial, sans-serif", fontSize: 16, lineHeight: 1.65, color: INK, margin: "0 0 16px" },
  rule: { border: "none", borderTop: `1px solid ${INK}1a`, margin: "40px 0" },
  signoff: { fontFamily: "Helvetica, Arial, sans-serif", fontSize: 16, color: INK, margin: "32px 0 0" },
  footer: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: FOG, margin: "48px 0 0" },
};

export default function ContactAutoresponder({ name }: { name: string }) {
  const first = name.split(" ")[0] || name;
  return (
    <Html>
      <Head />
      <Preview>Memo received — a real person reads every one.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.kicker}>Memo received</Text>
          <Heading style={styles.h1}>
            Thanks, {first}. <span style={styles.italic}>We&rsquo;re reading.</span>
          </Heading>

          <Section>
            <Text style={styles.p}>
              A real person reads every memo request. Expect a reply from someone with a name —
              not a no-reply address — within 72 hours.
            </Text>
            <Text style={styles.p}>
              When we write back, it will be a 2-page memo: scope, team, timeline, price.
              If we&rsquo;re not the right fit we&rsquo;ll say so, and tell you who is.
            </Text>
          </Section>

          <Hr style={styles.rule} />

          <Text style={styles.signoff}>— BrainOn</Text>
          <Text style={styles.footer}>This is an automated acknowledgement. Replies go to the team.</Text>
        </Container>
      </Body>
    </Html>
  );
}
