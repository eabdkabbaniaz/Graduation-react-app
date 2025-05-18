import { actions } from "../../store/Data";

export default function QuestionsList({ questions , handleDelete , onEdit}){

    return (
        <ol className="list-decimal list-inside space-y-4 text-right text-sm leading-relaxed">
                    {questions.map((q,index) => (
                        <li key={q.id} className="relative rounded-[100px] bg-purple-600 hover:bg-gray-500 text-white p-4">
                            {q.question}:
                            {actions.map((a => (
                                <div
                                    key={a.id}
                                    aria-label={a.label}
                                    className={`absolute ${a.id === 2 ? "left-[20px]" : "left-[50px]"} top-[20px] w-5 h-5 text-white cursor-pointer`}
                                    onClick={() => {
                                        if (a.label === "Delete") {
                                            handleDelete(q.id , index + 1 );
                                        } else if (a.label === "Edit") onEdit?.(q , index + 1);
                                    }}
                                >
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={a.d} />
                                    </svg>
                                </div>
                            )))}
                            <br />
                            <ol>
                                {q.answers.map((answer, index) => {
                                    const letter = String.fromCharCode(65 + index); // A, B, C...
                                    return (
                                        <li
                                            key={answer.id}
                                            className={`inline-block mr-6 relative pl-6 ${answer.is_correct === 1 ? "bg-red-500 rounded-[100px] p-1" : ""}`}
                                        >
                                            <span className="ml-2">{letter}.</span>
                                            {answer.Answer}
                                        </li>
                                    );
                                })}
                            </ol>
                        </li>
                    ))}
                    
                </ol>
    )
}