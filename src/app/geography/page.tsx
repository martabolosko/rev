import Quiz from "../_components/Quiz";
import { geographyQuestions } from "../_data/geography";

export default function Geography() {
	return <Quiz questions={geographyQuestions} subject="Geography" />;
}
