"use client";

import {
	Box,
	Card,
	Container,
	Typography,
	Button,
	CardContent,
} from "@mui/material";
import React, { useState } from "react";

type QuizProps = {
	questions: Question[];
	subject: string;
};

const Quiz: React.FC<QuizProps> = ({ questions, subject }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
	const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
	const [retryMode, setRetryMode] = useState<boolean>(false);

	const handleAnswer = (selectedAnswer: string): void => {
		let currentQuestion = retryMode
			? questions.find((q) => wrongAnswers.includes(q.question))
			: questions[currentQuestionIndex];

		if (!currentQuestion) return;

		const answerIsCorrect = selectedAnswer === currentQuestion.correctAnswer;
		if (!answerIsCorrect && !retryMode) {
			setWrongAnswers((prev) => [...prev, currentQuestion!.question]);
		} else if (retryMode && answerIsCorrect) {
			setWrongAnswers((prev) =>
				prev.filter((q) => q !== currentQuestion!.question)
			);
		}

		if (!retryMode || !answerIsCorrect) {
			if (
				currentQuestionIndex <
				(retryMode ? wrongAnswers.length : questions.length) - 1
			) {
				setCurrentQuestionIndex((prev) => prev + 1);
			} else {
				setQuizCompleted(true);
				setCurrentQuestionIndex(0);
			}
		}
	};

	const restartQuiz = (): void => {
		setCurrentQuestionIndex(0);
		setWrongAnswers([]);
		setQuizCompleted(false);
		setRetryMode(false);
	};

	const retryWrongQuestions = (): void => {
		setCurrentQuestionIndex(0);
		setQuizCompleted(false);
		setRetryMode(true);
	};

	const displayQuestion = () => {
		let question = retryMode
			? questions.find((q) => q.question === wrongAnswers[currentQuestionIndex])
			: questions[currentQuestionIndex];

		return question ? question.question : "";
	};

	return (
		<Container maxWidth="xl">
			<Typography variant="h2" sx={{ textAlign: "center", mt: 5 }}>
				{subject}
			</Typography>
			<Box sx={{ textAlign: "center", mt: 2 }}>
				{quizCompleted ? (
					<Card sx={{ maxWidth: 500, mx: "auto", mt: "50px", p: 3 }}>
						<CardContent>
							<Typography variant="h5">Quiz Completed!</Typography>
							<Typography sx={{ mt: 2 }}>
								Right Answers: {questions.length - wrongAnswers.length}
							</Typography>
							<Typography>Wrong Answers: {wrongAnswers.length}</Typography>

							<Button
								variant="contained"
								color="primary"
								onClick={restartQuiz}
								sx={{ mx: 1, mt: 2 }}
							>
								Retake Quiz
							</Button>
							{wrongAnswers.length > 0 && (
								<Button
									variant="contained"
									color="secondary"
									onClick={retryWrongQuestions}
									sx={{ mx: 1, mt: 2 }}
								>
									Retry Wrong Answers
								</Button>
							)}
						</CardContent>
					</Card>
				) : (
					<Card sx={{ maxWidth: 500, mx: "auto", mt: "50px", p: 3 }}>
						<CardContent>
							<Typography variant="h5">{displayQuestion()}</Typography>
							{questions[currentQuestionIndex]?.options.map((option, index) => (
								<Button
									key={index}
									variant="contained"
									color="primary"
									onClick={() => handleAnswer(option)}
									sx={{
										mx: "auto",
										mt: 2,
										width: "100%",
										backgroundColor: "#d690cf",
									}}
								>
									{option}
								</Button>
							))}
						</CardContent>
					</Card>
				)}
			</Box>
		</Container>
	);
};

export default Quiz;
