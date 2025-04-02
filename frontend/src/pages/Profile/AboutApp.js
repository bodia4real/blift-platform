import React from "react";
import BreadcrumbNavigation from "../../components/UI/BreadcrumbNavigation";
import styled from "styled-components";

const AboutAppPage = () => {
  return (
    <PageWrapper>
      <BreadcrumbNavigation title="About App" />
      <Content>
        <Section>
          <h3>What is this app?</h3>
          <p>
            This app is built to simplify your workflow and bring convenience to
            your everyday life. Whether you're managing tasks, tracking goals,
            or simply browsing through helpful resources, our app makes it easy.
          </p>
        </Section>

        <Section>
          <h4>Our Mission</h4>
          <p>
            We aim to provide a simple, user-friendly platform for personal and
            professional growth. We believe in technology that empowers and
            supports people everywhere.
          </p>
        </Section>

        <Section>
          <h4>Version & Credits</h4>
          <ul>
            <li>
              <strong>Version:</strong> 1.0.0
            </li>
            <li>
              <strong>Developed by:</strong> Bohdan Yakubyak, Nazar Mocherniuk,
              ...
            </li>
            <li>
              <strong>Launched:</strong> 2025
            </li>
          </ul>
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default AboutAppPage;

const PageWrapper = styled.div`
  padding: 38px 0px;
`;

const Content = styled.section`
  margin-top: 32px;

  padding: 38px 0px;
`;

const Section = styled.section`
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
