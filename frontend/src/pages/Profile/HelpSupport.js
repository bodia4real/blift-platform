import React from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";

const HelpSupportPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Help & Support" />
      <Content>
        <Section>
          <Heading>Need help with the app?</Heading>
          <Paragraph>
            We’re here to assist you. Whether you’re experiencing technical
            issues or just have general questions, you can reach out to us
            anytime.
          </Paragraph>
        </Section>

        <Section>
          <SubHeading>Contact Support</SubHeading>
          <InfoList>
            <li>
              <strong>Email:</strong> support@yourapp.com
            </li>
            <li>
              <strong>Phone:</strong> +1 (888) 123-4567
            </li>
            <li>
              <strong>Hours:</strong> Mon–Fri, 9 AM to 6 PM (EST)
            </li>
          </InfoList>
        </Section>

        <Section>
          <SubHeading>Frequently Asked Questions</SubHeading>
          <Paragraph>
            Coming soon... We’re building a full FAQ to help you get quick
            answers.
          </Paragraph>
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default HelpSupportPage;

const PageWrapper = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  color: var(--black);
`;

const Content = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.article`
  background: #fff;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
`;

const Heading = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--black);
`;

const SubHeading = styled.h4`
  font-size: 20px;
  margin-bottom: 14px;
  color: var(--red);
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--grey);
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    font-size: 15px;
    margin-bottom: 10px;
    color: var(--grey);
  }

  strong {
    color: var(--black);
  }
`;
