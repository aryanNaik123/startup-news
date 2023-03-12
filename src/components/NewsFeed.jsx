import React, { useState, useEffect } from "react";

const NEWS_FEEDS = [
  {
    label: "Y Combinator",
    url: "https://news.ycombinator.com/rss",
  },
  {
    label: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
];

const NewsFeed = () => {
  const [feedUrl, setFeedUrl] = useState(NEWS_FEEDS[0].url);
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/${feedUrl}`
        );
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const items = xml.querySelectorAll("item");
        const feedItems = [];
        items.forEach((item) => {
          feedItems.push({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
            pubDate: item.querySelector("pubDate").textContent,
          });
        });
        setFeedItems(feedItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewsFeed();
  }, [feedUrl]);

  const handleFeedChange = (event) => {
    setFeedUrl(event.target.value);
  };

  return (
    <div>
      <h1>Startup News Feed</h1>
      <form>
        <label>
          Select a feed:
          <select value={feedUrl} onChange={handleFeedChange}>
            {NEWS_FEEDS.map((feed) => (
              <option key={feed.url} value={feed.url}>
                {feed.label}
              </option>
            ))}
          </select>
        </label>
      </form>
      {feedItems.map((item) => (
        <div key={item.link}>
          <h2>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </h2>
          <p>{item.pubDate}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
