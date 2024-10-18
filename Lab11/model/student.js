const students = [
    { id: 116257, name: "Anna Smith", program: "MBA" },
    { id: 615789, name: "John Doe", program: "Compro" },
    { id: 116868, name: "Tom Jerryh", program: "MBA" },
    { id: 116858, name: "Ly Hai", program: "Compro" },
    { id: 116859, name: "Dam Vinh Hung", program: "Compro" }];

export default class Student {
    constructor(id, name, program) {
        this.id = id
        this.name = name
        this.program = program
    }

    static getAll() {
        return structuredClone(students)
    }

    static createStudent(id, name, program) {
        let student = new Student(id, name, program)
        const index = students.findIndex(s => s.id == id)
        if (index === -1) {
            students.push(student)
            return student
        }
    }

    static sortBy(field, order) {
        return this.getAll().sort((e1, e2) => {
            return (typeof e1[field] === 'number') ?
                order * e1[field] - e2[field] : order * e1[field].localeCompare(e2[field])
        })
    }

    static filterBy(program) {
        return this.getAll().filter(e => !e.program.localeCompare(program))
    }

    static sortAndFilterBy(field, program) {
        let students = this.getAll().filter(e => !e.program.localeCompare(program))
        return students.sort((e1, e2) => {
            return (typeof e1[field] === 'number') ?
                e1[field] - e2[field] : e1[field].localeCompare(e2[field])
        })
    }

    static getStudentById(id) {
        return students.find(s => s.id == id)
    }

    static deleteStudentById(id) {
        const index = students.findIndex(s => s.id == id)
        if (index !== -1)
            return students.splice(index, 1)[0]
    }

    static updateStudentById(id, name, program) {
        const student = this.getStudentById(id)
        if (student) {
            student.name = name
            student.program = program
            return student
        }
    }
}