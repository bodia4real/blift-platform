import React from "react";
import styled from "styled-components";

const NewsItem = ({ title, description, date }) => {
  const formattedDate = new Date(date);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const fullDate = formattedDate.toLocaleDateString("en-US", options);

  return (
    <News>
      <header>
        <h3>{title}</h3>
      </header>
      <p className="description">{description}</p>
      <footer>
        <p className="date">Published: {fullDate}</p>
        <a>View Full News</a>
      </footer>
    </News>
  );
};

export default NewsItem;

const News = styled.article`
  background-color: white;
  padding: 22px 16px;
  border-radius: 6px;
  max-height: 186px;

  header {
    margin-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Обмеження до двох рядків */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis; /* Додає "..." при обрізанні тексту */
    max-width: 100%;
  }

  .description {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 12px;

    overflow: hidden;
    white-space: nowrap; /* Щоб текст не переносився на новий рядок */
    text-overflow: ellipsis; /* Додає "..." при обрізанні тексту */
    max-width: 100%; /* Запобігає виходу тексту за межі */
  }

  .date {
    color: var(--grey);
    font-size: 14px;
  }

  a {
    color: var(--red);
    font-size: 14px;
  }

  footer {
    display: flex;
    justify-content: space-between;
  }
`;
