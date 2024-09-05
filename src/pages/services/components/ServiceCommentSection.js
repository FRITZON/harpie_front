import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCommentSection = () => {
  const { t } = useTranslation();

  const comments = [
    {
      id: 1,
      text: t("services_page.service_hero_page.comments.text1"),
      author: t("services_page.service_hero_page.comments.author1")
    },
    {
      id: 2,
      text: t("services_page.service_hero_page.comments.text2"),
      author: t("services_page.service_hero_page.comments.author2")
    },
    {
      id: 3,
      text: t("services_page.service_hero_page.comments.text3"),
      author: t("services_page.service_hero_page.comments.author3")
    },
    {
      id: 4,
      text: t("services_page.service_hero_page.comments.text4"),
      author: t("services_page.service_hero_page.comments.author4")
    },
    {
      id: 5,
      text: t("services_page.service_hero_page.comments.text5"),
      author: t("services_page.service_hero_page.comments.author5")
    }
  ];

  return (
    <div className='service_comment_container'>
      <section className="service-comment-section">
        <h2>{t("services_page.service_hero_page.comment_section.title")}</h2> 
        <div className="comment-carousel">
          <motion.div
            className="comment-track"
            animate={{
              x: [0, -100 * comments.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {comments.concat(comments).map((comment, index) => (
              <div
                key={`${comment.id}-${index}`}
                className={`comment-card ${index % 2 === 0 ? 'even' : 'odd'}`}
              >
                <p className="comment-text">{comment.text}</p>
                <p className="comment-author">- {comment.author}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCommentSection;
