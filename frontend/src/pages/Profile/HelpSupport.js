import React from "react";
import styled from "styled-components";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";

const HelpSupportPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="Help & Support" />
      <Content>
        <Section>
          <h3>Need help with the app?</h3>
          <p>
            We’re here to assist you. Whether you’re experiencing technical
            issues or just have general questions, you can reach out to us
            anytime.
          </p>
        </Section>

        <Section>
          <h4>Contact Support</h4>
          <ul>
            <li>
              <strong>Email:</strong> support@yourapp.com
            </li>
            <li>
              <strong>Phone:</strong> +1 (888) 123-4567
            </li>
            <li>
              <strong>Hours:</strong> Mon–Fri, 9 AM to 6 PM (EST)
            </li>
          </ul>
        </Section>

        <Section>
          <h4>Frequently Asked Questions</h4>
          <p>
            Coming soon... We’re building a full FAQ to help you get quick
            answers.
          </p>
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default HelpSupportPage;

const PageWrapper = styled.div`
  padding: 38px 0px;
`;

const Content = styled.section`
  margin-top: 32px;

  padding: 38px 0px;
`;

const Section = styled.article`
  margin-bottom: 28px;

  h3,
  h4 {
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    line-height: 1.6;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    li {
      margin-bottom: 8px;
      font-size: 15px;
    }
  }
`;
