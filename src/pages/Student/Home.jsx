import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "exams"));
        const examsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExams(examsData);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h2>Available Exams</h2>
      {exams.length > 0 ? (
        <ul>
          {exams.map((exam) => (
            <li key={exam.id}>
              <span>{exam.title}</span>
              <button onClick={() => navigate(`/exam/${exam.id}`)}>Take Exam</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No exams available.</p>
      )}
    </div>
  );
}

export default Home;
