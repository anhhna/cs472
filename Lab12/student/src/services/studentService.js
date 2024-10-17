const API_URL = 'http://localhost:3000/';

export const getAllStudents = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
};

export const createStudent = async (student) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
};
