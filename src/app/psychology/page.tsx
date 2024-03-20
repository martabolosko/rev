import Quiz from "../_components/Quiz";
import { psychologyQuestions } from "../_data/psychology";

export default function Psychology() {
	return <Quiz questions={psychologyQuestions} subject="Psychology" />;
}
