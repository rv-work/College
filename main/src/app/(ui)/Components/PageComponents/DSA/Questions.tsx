import Link from "next/link";
import QuestionCard from "./QuestionCard";

interface Question {
  id :string;
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  topicName?: string; 
  completed?: boolean; 
  markedForRevision ?: boolean;
  slug : string;
}
type QuestionsProps = {
  filteredQuestions: Question[]
}




const Questions: React.FC<QuestionsProps> = ({ filteredQuestions}) => {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question , ind) => (
            <Link key={ind} 
            href={`/dsa/code/${question.slug}`}
            >
             <QuestionCard question={question} />
            </Link>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-400">
              No questions found with current filters
            </h3>
            <p className="text-gray-500 mt-2">
              Try changing your topic or difficulty selection
            </p>
          </div>
        )}
   </div>
  )
}

export default Questions
