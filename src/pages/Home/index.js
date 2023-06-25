import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm";
import PostList from "../../components/PostList";
import { useToasts } from "react-toast-notifications";
import { getPost, sendPost, postUpdate, postDelete } from "../../api/api";

const Home = ({ mode, setMode, CiDark, CiLight }) => {
  const { addToast } = useToasts();
  const [posts, setPosts] = useState([]);
  const [postsUpdate, setPostsUpdate] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState("");
  const [content, setContent] = useState("");
  const [contents, setContents] = useState("");

  const fetchData = () => {
    getPost()
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;

          if (Array.isArray(responseData)) {
            setPosts(responseData);
          } else if (typeof responseData === "object") {
            setPosts([responseData]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    const newPost = {
      title,
      content,
    };
    setPosts([...posts, newPost]);
    sendPost(newPost)
      .then((response) => {
        addToast("Post Create Successfully!", {
          appearance: "success",
        });
        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          if (Array.isArray(responseData)) {
            setPosts(responseData);
          } else if (typeof responseData === "object") {
            setPosts([responseData]);
          }
        }
        fetchData();
      })
      .catch((error) => {
        addToast("Error!", {
          appearance: "error",
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(titles);
    console.log(contents);
    const newPost = {
      title: titles,
      content: contents,
    };
    setPostsUpdate([...postsUpdate, newPost]);

    postUpdate(id, newPost)
      .then((response) => {
        addToast("Post Update Successfully!", {
          appearance: "success",
        });
        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          if (Array.isArray(responseData)) {
            setPosts(responseData);
          } else if (typeof responseData === "object") {
            setPosts([responseData]);
          }
        }
        fetchData();
      })
      .catch((error) => {
        addToast("Error!", {
          appearance: "error",
        });
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    postDelete(id)
      .then((response) => {
        addToast("Post Delete Successfully!", {
          appearance: "success",
        });
        // if (response.status === 200) {
        //   const responseData = response.data;
        //   console.log(responseData);
        //   if (Array.isArray(responseData)) {
        //     setPosts(responseData);
        //   } else if (typeof responseData === "object") {
        //     setPosts([responseData]);
        //   }
        // }
        fetchData();
      })
      .catch((error) => {
        addToast("Error!", {
          appearance: "error",
        });
      });
  };

  const navigate = useNavigate();

  const Logout = () => {
    addToast("Logout Successfully!", {
      appearance: "success",
    });
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    });
  };
  return (
    <div
      className={` ${
        mode ? "bg-black" : "bg-white"
      }  w-full h-screen object-contain overflow-auto`}
    >
      <div className="h-screen w-full flex justify-center items-center ">
        <div className={` ${mode ? "bg-dark" : "bg-white"} h-4/5 w-4/5 `}>
          <div className="flex justify-around ">
            <h1
              className={`${
                mode ? " text-white" : "text-black"
              } text-center  text-4xl italic w-max `}
            >
              Post
            </h1>
            <button
              className={`${
                mode ? " text-white" : "text-black"
              } text-5xl rounded-xl border-solid border-2`}
              onClick={() => {
                setMode(!mode);
                addToast(
                  mode
                    ? "Light Mode Enable Successfully!"
                    : "Dark Mode Enable Successfully!",
                  { appearance: "success" }
                );
              }}
            >
              {mode ? <CiDark /> : <CiLight />}
            </button>
            <button
              className={`${
                mode ? " text-white" : "text-black"
              } text-xl rounded-xl border-solid border-2 px-2`}
              onClick={Logout}
            >
              Logout
            </button>
          </div>
          <div className="container mx-auto p-4">
            <PostForm
              title={title}
              setTitle={setTitle}
              setPost={setPost}
              content={content}
              setContent={setContent}
              mode={mode}
              handleSubmit={handleSubmit}
            />
            <PostList
              title={post.title}
              content={post.content}
              setTitle={setTitles}
              setContent={setContents}
              posts={posts}
              mode={mode}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
