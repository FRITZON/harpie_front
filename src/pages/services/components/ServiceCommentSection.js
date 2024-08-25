import React from 'react';
import { motion } from 'framer-motion';

const comments = [
  {
    id: 1,
    text: "This insurance comparison system is amazing! I found the best policy in minutes.",
    author: "John Doe"
  },
  {
    id: 2,
    text: "I've saved so much money using this service. Highly recommended!",
    author: "Jane Smith"
  },
  {
    id: 3,
    text: "The user interface is intuitive and the results are spot on. Great job!",
    author: "Mike Johnson"
  },
  {
    id: 4,
    text: "I never knew finding insurance could be this easy. Thank you!",
    author: "Sarah Brown"
  },
  {
    id: 5,
    text: "Excellent service! It helped me understand my options clearly.",
    author: "Chris Lee"
  }
];

const ServiceCommentSection = () => {
  return (
    <div className='service_comment_container'>
        <section className="service-comment-section">
        <h2>What Our Users Say</h2>
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