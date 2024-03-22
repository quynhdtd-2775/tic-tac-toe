import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { useEffect, useState } from "react";

const FirebaseApp = () => {
  // colRef

  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);

  //   console.log(colRef);

  useEffect(() => {
    // 1. Get Collection Data (posts)
    // Cach 1:
    // getDocs(colRef).then((snapshot) => {
    //   //   console.log(snapshot);
    //   let blogs = [];
    //   snapshot.docs.forEach((doc) => {
    //     blogs.push({
    //       id: doc.id,
    //       ...doc.data(),
    //     });
    //   });
    //   setPosts(blogs);
    //   //   console.log(blogs);
    // });

    //Cach 2: In real time
    onSnapshot(colRef, (snapshot) => {
      let blogs = [];
      snapshot.docs.forEach((doc) => {
        blogs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(blogs);
      //   console.log(blogs);))
    });
  }, []);

  const handleAddPost = () => {
    addDoc(colRef, {
      title,
      author,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        console.log("success");
        //  Reset form
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePostById = async (e) => {
    e.preventDefault();
    const collectionRef = doc(db, "posts", postId);
    await deleteDoc(collectionRef);
    console.log("suceess");
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const collectionUpdateRef = doc(db, "posts", postId);
    await updateDoc(collectionUpdateRef, {
      title: "this is a new title",
    });
    console.log("suceess");
  };

  //Fetching single document

  //
  useEffect(() => {
    // const colRef = collection(db, "posts");
    const q = query(colRef, where("author", "==", "hello"), limit(5));
    onSnapshot(q, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(posts);
    });
  }, []);

  // Auth, Login, Logout, Sign up

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Enter the title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        name="author"
        placeholder="Enter the author"
        onChange={(e) => setAuthor(e.target.value)}
      ></input>

      <button type="submit" onClick={handleAddPost}>
        Add post
      </button>

      <div>
        <input
          type="text"
          name="postId"
          placeholder="Enter the post id"
          onChange={(e) => setPostId(e.target.value)}
        />
        <button type="submit" onClick={handleDeletePostById}>
          Delete
        </button>
      </div>

      <div>
        {posts.length > 0 && posts.map((item) => <div>{item.title}</div>)}
      </div>
    </div>
  );
};

export default FirebaseApp;
