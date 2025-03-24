import React, { useState } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import AdminNav from "../../components/Navigation/AdminNav";

function AddExam() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [type, setType] = useState("multiple-choice");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [points, setPoints] = useState(1); // Default point value

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addQuestion = () => {
    const newQuestion = {
      text: questionText,
      type,
      options: type === "multiple-choice" ? options : [],
      answer: type === "essay" ? "Pending" : answer, // Mark essay as "Pending"
      points,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setPoints(1);
  };

  const handleSaveExam = async () => {
    if (!title) {
      alert("Please enter an exam title!");
      return;
    }

    try {
      await addDoc(collection(db, "exams"), {
        title,
        questions,
        timestamp: new Date(),
      });
      alert("Exam added successfully!");
      setTitle("");
      setQuestions([]);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <div>
      <AdminNav />
      <h2>Add Exam</h2>
      <input
        type="text"
        placeholder="Exam Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="multiple-choice">Multiple Choice</option>
        <option value="identification">Identification</option>
        <option value="essay">Essay</option>
      </select>
      {type === "multiple-choice" && (
        <>
          {options.map((opt, index) => (
            <div key={index}>
              <label>{String.fromCharCode(65 + index)}.</label>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </>
      )}
      {type !== "essay" && (
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}
      <br />
      <label>Points:</label>
      <input
        type="number"
        value={points}
        min="1"
        onChange={(e) => setPoints(Number(e.target.value))}
      />
      <button onClick={addQuestion}>Add Question</button>

      <h3>Questions Added:</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            {q.text} - {q.type} ({q.points} pts)
          </li>
        ))}
      </ul>

      <button onClick={handleSaveExam}>Save Exam</button>
    </div>
  );
}

export default AddExam;
