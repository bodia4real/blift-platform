import React from "react";

import styled from "styled-components";

const HomePage = () => {
  return (
    <PageWrapper>
      <Section>
        <h2>My Blift portal account</h2>
        <div className="line" />
        <p>
          You are signed in as <span>John Benjamin</span>
        </p>
      </Section>
      <Section>
        <h2>Your Active Cases</h2>
        <p>
          View and manage your ongoing applications. Track the status, review
          important details, and complete any pending actions.
        </p>
      </Section>
      <Section>
        <h2>Messages Center</h2>
        <p>
          View messages related to your account. Notifications about your
          submitted applications can be found on the application status page.
        </p>

        <p className="highlighted">You have no messages.</p>
      </Section>
    </PageWrapper>
  );
};

export default HomePage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const Section = styled.section`
  h2 {
    font-size: 24px;
    color: var(--black);
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: var(--grey);
    margin-bottom: 24px;
  }

  p > span {
    color: var(--red);
    font-weight: 700;
  }

  .line {
    border-top: 1px solid var(--red);
    margin-bottom: 12px;
  }

  .highlighted {
    color: var(--red);
  }
`;
