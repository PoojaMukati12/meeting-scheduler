import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";


  export interface MeetingEmailProps {
  userFirstName: string;  // Recipient's name
  duration: number;       // Duration of the meeting in minutes
  meetingTime: string;    // Time of the meeting
  date: string;           // Date of the meeting (formatted string)
  meetingUrl: string;     // Meeting link
  businessName: string;   // Business/host name
}

  const baseUrl = '';
  
export const Email: React.FC<MeetingEmailProps> = ({
  userFirstName,
  duration,
  meetingTime,
  date,
  meetingUrl,
  businessName,
}) => {

  
    return (
      <Html>
        <Head />
        <Preview>Yelp recent login</Preview>
        <Body style={main}>
          <Container>
            <Section style={logo}>
              <Img src={''} />
            </Section>
  
            <Section style={content}>
           
  
              <Row style={{ ...boxInfos, paddingBottom: "0" }}>
                <Column>
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Hi {userFirstName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                   Thank you for scheduling Meeting with {businessName},
                  </Heading>
                    <Text>Please find the meeting details:</Text>
                  <Text style={paragraph}>
                    <b>Time: </b>
                    {meetingTime}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>date: </b>
                    {date}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Location:  </b>
                    {meetingUrl}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>duration: </b>
                    {duration}
                  </Text>
                  <Text
                    style={{
                      color: "rgb(0,0,0, 0.5)",
                      fontSize: 14,
                      marginTop: -5,
                    }}
                  >
                    *Please Join meeting on above details--{meetingUrl}
                  </Text>
  
                
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: "0" }}>
                <Column style={containerButton} colSpan={2}>
                  <Button style={button}>Join Now</Button>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };

  export default Email;
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: "30px 20px",
  };
  
  const containerButton = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };
  
  const button = {
    backgroundColor: "#e00707",
    borderRadius: 3,
    color: "#FFF",
    fontWeight: "bold",
    border: "1px solid rgb(0,0,0, 0.1)",
    cursor: "pointer",
    padding: "12px 30px",
  };
  
  const content = {
    border: "1px solid rgb(0,0,0, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
  };
  
  const image = {
    maxWidth: "100%",
  };
  
  const boxInfos = {
    padding: "20px",
  };
  
  const containerImageFooter = {
    padding: "45px 0 0 0",
  };