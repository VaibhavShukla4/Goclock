import React, { useState } from "react";

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  mode,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2
        className={` text-xl  mb-4 md:text-2xl tracking-wide    font-bold ${
          mode ? "text-white" : "text-gray-600"
        }`}
      >
        Create Post
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default PostForm;
