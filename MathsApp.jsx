
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Year 4 Maths Practice App
 * Focus:
 * - Addition and subtraction up to 4 digits
 * - Multiplication facts (times tables)
 * - No negative answers
 */export default function MathsApp() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState("add"); // add | sub | mult


  const generateQuestion = () => {
    let a, b, correct, text;
    if (mode === "add") {
      a = Math.floor(Math.random() * 9000) + 100;
      b = Math.floor(Math.random() * 9000) + 100;
      correct = a + b;
      text = `${a} + ${b}`;
    }
    if (mode === "sub") {
      a = Math.floor(Math.random() * 9000) + 100;
      b = Math.floor(Math.random() * a); // ensures no negatives
      correct = a - b;
      text = `${a} − ${b}`;
    }


    if (mode === "mult") {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      correct = a * b;
      text = `${a} × ${b}`;
    }


    setQuestion({ text, correct });
    setAnswer("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (Number(answer) === question.correct) {
      setFeedback("✅ Correct – great work!");
    } else {
      setFeedback(`❌ Not quite. The correct answer was ${question.correct}.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold text-center">Year 4 Maths Practice</h1>


          <div className="flex justify-center gap-2">
            <Button variant={mode === "add" ? "default" : "outline"} onClick={() => setMode("add")}>
              Addition
            </Button>
            <Button variant={mode === "sub" ? "default" : "outline"} onClick={() => setMode("sub")}>
              Subtraction
            </Button>
            <Button variant={mode === "mult" ? "default" : "outline"} onClick={() => setMode("mult")}>
              Times Tables
            </Button>
          </div>

          <Button className="w-full" onClick={generateQuestion}>New Question</Button>

          {question && (
            <div className="text-center space-y-3">
              <div className="text-3xl font-semibold">{question.text} = ?</div>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="border rounded-xl p-2 w-full text-center text-xl"
              />
              <Button onClick={checkAnswer} className="w-full">Check Answer</Button>
              {feedback && <div className="text-lg">{feedback}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
