import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quiz-progress");
    if (saved) {
      const { currentQ, userAnswers } = JSON.parse(saved);
      setCurrentQuestion(currentQ);
      setAnswers(userAnswers);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "quiz-progress",
      JSON.stringify({ currentQ: currentQuestion, userAnswers: answers })
    );
  }, [currentQuestion, answers]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
    localStorage.removeItem("quiz-progress");
    navigate("/results");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ITI-English-Exam 1
          </h1>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>
              Question {currentQuestion + 1} / {questions.length}
            </span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 bg-card border-border shadow-xl transition-all duration-300 animate-fade-in">
          <div className="mb-6">
            <img
              src={question.image}
              alt={`Question ${question.id}`}
              className="w-full max-h-96 object-contain rounded-lg mb-6"
              loading="lazy"
            />
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index + 1)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedAnswer === index + 1
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8 gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Previous
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={() => setShowSubmitDialog(true)}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Submit Answers
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Submit Your Answers?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              You've answered {Object.keys(answers).length} out of{" "}
              {questions.length} questions. Are you sure you want to submit your
              answers? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Quiz;
