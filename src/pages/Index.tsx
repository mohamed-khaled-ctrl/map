import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            ITI-English-Exam 1
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            100 image-based IQ questions designed for ITI preparation. Test your skills and track your progress.
          </p>
        </div>

        <Card className="p-8 bg-card border-border shadow-xl mb-8 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Exam Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  100 Questions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Image-based multiple choice questions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  No Time Limit
                </h3>
                <p className="text-sm text-muted-foreground">
                  Take your time to answer carefully
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Instant Results
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed feedback after submission
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-3">
              Instructions
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Each question contains an image and four options (A, B, C, D)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You can navigate back and forth between questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your progress is automatically saved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Review your answers after submission</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 hover:scale-[1.02] transition-transform"
          >
            Start Test
          </Button>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Good luck with your exam! 🎯
        </p>
      </div>
    </div>
  );
};

export default Index;
