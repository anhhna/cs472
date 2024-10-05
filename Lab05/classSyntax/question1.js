class Student {
    constructor(id) {
        this.studentId = id
        this.answers = []
    }

    addAnswer(question) {
        this.answers.push(question)
    }

    getAnswer() {
        return this.answers
    }
}

class Question {
    constructor(id, answer) {
        this.qid = id
        this.answer = answer
    }

    checkAnswer(answer) {
        return this.answer === answer
    }
}

class Quiz {
    constructor(questions, students) {
        this.students = students
        this.questions = questions.reduce((map, question) => {
            map[question.qid] = question.answer
            return map
        }, {})
    }

    scoreStudentBySid(sid) {
        const student = this.students.find(s => {
            return s.studentId === sid
        })
        if (student) {
            const answers = student.getAnswer()
            let score = 0
            answers.forEach(element => {
                if (element.checkAnswer(this.questions[element.qid]))
                    score++
            });
            return score
        }
        return 0
    }

    getAverageScore() {
        if (this.students.length > 0) {
            const sum = this.students.map(s => this.scoreStudentBySid(s.studentId))
                                    .reduce((acc, num) => acc + num, 0)
            const average = sum / this.students.length
            return average
        }
        return 0
    }
}

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

let scoreforStudent10 = quiz.scoreStudentBySid(10)
console.log(scoreforStudent10); //Expected Result: 3

let scoreforStudent11 = quiz.scoreStudentBySid(11)
console.log(scoreforStudent11); //Expected Result: 2

let average = quiz.getAverageScore()
console.log(average); //Expected Reuslt: 2.5
