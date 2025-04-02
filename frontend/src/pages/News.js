import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import NewsItem from "../components/News/NewsItem";
import BreadcrumbNavigation from "../components/UI/BreadcrumbNavigation";

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const data = await axios.get(
        "https://newsdata.io/api/1/latest?country=ca&category=top&apikey=pub_75266df2751bc9d40f3200e7806e9a9150664"
      );
      setNews(data.data.results);
      return data;
    }
    const newsData = fetchNews();
  }, []);

  return (
    <PageWrapper>
      <BreadcrumbNavigation title="News" />
      <NewsContainer>
        {news.map((newsItem, index) => (
          <NewsItem
            key={index}
            title={newsItem.title}
            description={newsItem.description}
            date={newsItem.pubDate}
          />
        ))}
      </NewsContainer>
    </PageWrapper>
  );
};

export default NewsPage;

const PageWrapper = styled.div`
  padding: 38px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 28px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: var(--red);
    display: flex;
    align-items: center;
  }

  img {
    margin-top: 4px;
    width: 20px;
    height: 20px;
  }
`;

const NewsContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
