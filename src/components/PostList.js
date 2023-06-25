import React from "react";
import Post from "./Post";

const PostList = ({
  setTitle,
  setContent,
  posts,
  mode,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div>
      <h2
        className={`text-xl font-bold mb-4 md:text-2xl tracking-wide    ${
          mode ? "text-white" : "text-gray-600"
        }`}
      >
        Post List
      </h2>
      {posts[0]?.posts?.map((post, index) => (
        <Post
          key={index}
          post={post}
          setTitle={setTitle}
          setContent={setContent}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
