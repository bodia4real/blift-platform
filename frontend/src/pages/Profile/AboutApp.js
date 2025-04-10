import React from "react";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";
import styled from "styled-components";

const AboutAppPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="About App" />
      <Content>
        <Section>
          <Heading>What is this app?</Heading>
          <Paragraph>
            This app is built to simplify your workflow and bring convenience to
            your everyday life. Whether you're managing tasks, tracking goals,
            or simply browsing through helpful resources, our app makes it easy.
          </Paragraph>
        </Section>

        <Section>
          <SubHeading>Our Mission</SubHeading>
          <Paragraph>
            We aim to provide a simple, user-friendly platform for personal and
            professional growth. We believe in technology that empowers and
            supports people everywhere.
          </Paragraph>
        </Section>

        <Section>
          <SubHeading>Version & Credits</SubHeading>
          <InfoList>
            <li>
              <strong>Version:</strong> 1.0.0
            </li>
            <li>
              <strong>Developed by:</strong> Bohdan Yakubyak, Tawfeeq
              Mohammadpur, Hojhan Siavash Glolani
            </li>
            <li>
              <strong>Launched:</strong> 2025
            </li>
          </InfoList>
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default AboutAppPage;

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

const Section = styled.section`
  background-color: #ffffff;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
`;

const Heading = styled.h3`
  font-size: 24px;
  color: var(--black);
  margin-bottom: 16px;
`;

const SubHeading = styled.h4`
  font-size: 20px;
  color: var(--red);
  margin-bottom: 14px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--grey);
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 8px;

  li {
    font-size: 15px;
    margin-bottom: 10px;
    color: var(--grey);
  }

  strong {
    color: var(--black);
  }
`;
