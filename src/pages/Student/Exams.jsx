import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Exams() {
  const { id } = useParams(); // Exam ID from URL
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({}); // Store student answers

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examRef = doc(db, "exams", id);
        const examSnap = await getDoc(examRef);
        if (examSnap.exists()) {
          setExam(examSnap.data());
        } else {
          console.error("Exam not found!");
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      }
    };

    fetchExam();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "studentAnswers"), {
        examId: id,
        answers,
        timestamp: new Date(),
      });
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div>
      {exam ? (
        <>
          <h2>{exam.title}</h2>
          <ul>
            {exam.questions.map((question, index) => (
              <li key={index}>
                <p>{question.text}</p>
                {question.type === "multiple-choice" && (
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {question.type === "essay" && (
                  <textarea
                    placeholder="Write your answer here..."
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  ></textarea>
                )}
                {question.type === "identification" && (
                  <input
                    type="text"
                    placeholder="Your answer..."
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                )}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit Exam</button>
        </>
      ) : (
        <p>Loading exam...</p>
      )}
    </div>
  );
}

export default Exams;
