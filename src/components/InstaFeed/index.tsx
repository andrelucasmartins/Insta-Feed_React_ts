import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  permalink: string;
}
export function InstaFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);

  async function getInstanceFeed() {
    const token = import.meta.env.VITE_INSTA_TOKEN;
    const fields = "media_url,media_type,permalink";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    const { data } = await axios.get(url);
    setFeedList(data.data);
  }

  useEffect(() => {
    getInstanceFeed();
  }, []);
  return (
    <section className={styles.container}>
      {feedList.map((item) => (
        <a
          href={item.permalink}
          key={item.id}
          target="_blank"
          className={styles.item}
        >
          {item.media_type === "IMAGE" ? (
            <img src={item.media_url} alt="" />
          ) : (
            <video controls>
              <source src={item.media_url} />
            </video>
          )}
        </a>
      ))}
    </section>
  );
}
