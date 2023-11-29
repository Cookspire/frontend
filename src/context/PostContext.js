import { createContext, useState } from "react";

export const PostDataContext = createContext();
export const UpdatePostDataContext = createContext();

export default function PostContext({ children }) {
  const [posts, setPosts] = useState([]);

  const updatePostData = (data) => {
    setPosts(data);
  };

  return (
    <UpdatePostDataContext.Provider value={updatePostData}>
      <PostDataContext.Provider value={posts}>
        {children}
      </PostDataContext.Provider>
    </UpdatePostDataContext.Provider>
  );
}
