import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const moviesCollectionRef = collection(db, "movies");

  const [movieList, setMovieList] = useState([]);

  //NEW MOVIE STATES
  const [newmovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isMovieOscar, setIsMovieOscar] = useState(false);

  // UPDATE TITLE STATES
  const [updatedTitle, setUpdatedTitle] = useState(false);

  // FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(false);

  // CREATE MOVIE
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newmovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  // READ MOVIES
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filtredData);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE MOVIE TITLE
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  // DELETE MOVIE
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  // UPLOAD FILES
  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      Firebase
      <Auth />
      <br />
      <br />
      <br />
      <br />
      <div>
        <input
          type="text"
          placeholder="Movie Title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Movie year..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <br />
        <input
          type="checkbox"
          // checked={isMovieOscar}
          onChange={(e) => setIsMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie, id) => (
          <div key={id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>
            <br />
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <br />
            <input
              type="text"
              placeholder="Update Title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Movie Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
