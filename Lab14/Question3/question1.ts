class Student {
    studentId: number;
    answers: Question[];

    constructor(id: number) {
        this.studentId = id;
        this.answers = [];
    }

    addAnswer(question: Question): void {
        this.answers.push(question);
    }

    getAnswer(): Question[] {
        return this.answers;
    }
}

class Question {
    qid: number;
    answer: string;

    constructor(id: number, answer: string) {
        this.qid = id;
        this.answer = answer;
    }

    checkAnswer(answer: string): boolean {
        return this.answer === answer;
    }
}

class Quiz {
    students: Student[];
    questions: { [key: number]: string };

    constructor(questions: Question[], students: Student[]) {
        this.students = students;
        this.questions = questions.reduce((map, question) => {
            map[question.qid] = question.answer;
            return map;
        }, {} as { [key: number]: string });
    }

    scoreStudentBySid(sid: number): number {
        const student = this.students.find(s => s.studentId === sid);
        if (student) {
            const answers = student.getAnswer();
            let score = 0;
            answers.forEach(element => {
                if (element.checkAnswer(this.questions[element.qid])) {
                    score++;
                }
            });
            return score;
        }
        return 0;
    }

    getAverageScore(): number {
        if (this.students.length > 0) {
            const sum = this.students.map(s => this.scoreStudentBySid(s.studentId))
                                     .reduce((acc, num) => acc + num, 0);
            const average = sum / this.students.length;
            return average;
        }
        return 0;
    }
}

// Example usage
const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students = [student1, student2];
const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];

const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); // Expected Result: 3

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); // Expected Result: 2

let average = quiz.getAverageScore();
console.log(average); // Expected Result: 2.5
