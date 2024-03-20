import React from "react";
import Quiz from "../_components/Quiz";
import { computerScience } from "../_data/computerScience";

export default function ComputerScience() {
	return <Quiz questions={computerScience} subject="Computer Science" />;
}
