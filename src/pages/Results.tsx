import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { questions } from "@/data/questions";
import { CheckCircle2, XCircle, Download, Home } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quiz-answers");
    if (!saved) {
      navigate("/");
      return;
    }
    setAnswers(JSON.parse(saved));
  }, [navigate]);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = (score / questions.length) * 100;

  const getPerformanceLabel = () => {
    if (percentage >= 90) return { label: "Excellent", color: "text-success" };
    if (percentage >= 75) return { label: "Very Good", color: "text-primary" };
    if (percentage >= 50) return { label: "Average", color: "text-warning" };
    return { label: "Needs Improvement", color: "text-error" };
  };

  const performance = getPerformanceLabel();

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    localStorage.removeItem("quiz-answers");
    localStorage.removeItem("quiz-progress");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 print:bg-white">
      <div className="max-w-4xl mx-auto">
        {!showReview ? (
          <Card className="p-8 bg-card border-border shadow-xl animate-fade-in print:border-0 print:shadow-none">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Exam Results
              </h1>
              <p className="text-muted-foreground">ITI-English-Exam 1</p>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary mb-4">
                <span className="text-5xl font-bold text-primary">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {score} / {questions.length}
              </h2>
              <p className={`text-xl font-medium ${performance.color}`}>
                {performance.label}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-secondary border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Correct</p>
                  <p className="text-2xl font-bold text-success">{score}</p>
                </div>
              </Card>
              <Card className="p-4 bg-secondary border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Incorrect</p>
                  <p className="text-2xl font-bold text-error">
                    {questions.length - score}
                  </p>
                </div>
              </Card>
              <Card className="p-4 bg-secondary border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                  <p className="text-2xl font-bold text-primary">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
              <Button
                onClick={() => setShowReview(true)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                View Answers
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Print Results
              </Button>
              <Button
                onClick={handleRestart}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Answer Review
              </h2>
              <Button
                onClick={() => setShowReview(false)}
                variant="outline"
                size="sm"
              >
                Back to Results
              </Button>
            </div>

            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correct_answer;

              return (
                <Card
                  key={question.id}
                  className="p-6 bg-card border-border shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-error flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">
                        Question {index + 1}
                      </h3>
                      <img
                        src={question.image}
                        alt={`Question ${question.id}`}
                        className="w-full max-h-48 object-contain rounded-lg mb-4"
                      />
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const optionNumber = optIndex + 1;
                          const isUserAnswer = userAnswer === optionNumber;
                          const isCorrectAnswer =
                            question.correct_answer === optionNumber;

                          let bgColor = "bg-secondary";
                          if (isCorrectAnswer) {
                            bgColor = "bg-success/20 border-success";
                          } else if (isUserAnswer && !isCorrect) {
                            bgColor = "bg-error/20 border-error";
                          }

                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg border ${bgColor}`}
                            >
                              <span className="font-medium">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>{" "}
                              {option}
                              {isCorrectAnswer && (
                                <span className="ml-2 text-sm text-success">
                                  (Correct Answer)
                                </span>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <span className="ml-2 text-sm text-error">
                                  (Your Answer)
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
