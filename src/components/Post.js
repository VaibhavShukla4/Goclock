import React, { useState } from "react";
import { postUpdate, postDelete } from "../api/api";
const Post = ({
  title,
  post,
  setTitle,
  content,
  setContent,
  handleUpdate,
  handleDelete,
}) => {
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-col justify-between">
      {editing ? (
        <React.Fragment>
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 mb-2 rounded"
            defaultValue={post?.title}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 p-2 mb-2 rounded"
            defaultValue={post?.content}
          ></textarea>
          <button
            onClick={(e) => handleUpdate(e, post._id)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2 w-1/2"
          >
            Update
          </button>
        </React.Fragment>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
          <p className="mb-2">{post?.content}</p>
          <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2 w-1/2"
          >
            Edit
          </button>
          &nbsp;
          <button
            onClick={() => handleDelete(post._id)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-1/2"
          >
            {console.log(post._id)}
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Post;
