import { Question } from './types'

export const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta', 'Apple', 'Uber', 'Airbnb']
export const CATEGORIES = ['React', 'JavaScript', 'TypeScript', 'CSS', 'System Design', 'Node.js', 'Next.js', 'Databases']

export const DUMMY_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'What is the difference between specific and universal selectors in CSS?',
    answer: 'Specific selectors apply to specific elements (e.g., class, id), while universal selectors (*) apply to all elements. Specificity determines which style wins when multiple rules apply.',
    categories: ['CSS', 'Frontend'],
    company: 'Google',
    difficulty: 'Easy',
    createdAt: '2023-10-01',
  },
  {
    id: '2',
    question: 'Explain the concept of closures in JavaScript.',
    answer:
      "A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function's variables — a scope chain. The inner function preserves the variables of the outer function even after the outer function has finished executing.",
    categories: ['JavaScript', 'Core'],
    company: 'Meta',
    difficulty: 'Medium',
    createdAt: '2023-10-05',
  },
  {
    id: '3',
    question: 'What are React Hooks? Name a few common ones.',
    answer: 'Hooks are functions that let you use state and other React features without writing a class. Common hooks include useState, useEffect, useContext, and useReducer.',
    categories: ['React', 'Frontend'],
    company: 'Airbnb',
    difficulty: 'Easy',
    createdAt: '2023-10-10',
  },
  {
    id: '4',
    question: 'How do you handle state management in a large Next.js application?',
    answer:
      'State management can be handled using React Context for global state, or libraries like Redux, Zustand, or Jotai. Server state is often managed with tools like React Query or SWR, or simply viewing Server Components as the source of truth.',
    categories: ['Next.js', 'System Design'],
    company: 'Amazon',
    difficulty: 'Hard',
    createdAt: '2023-10-12',
  },
  {
    id: '5',
    question: 'What is the difference between Relational and Non-Relational databases?',
    answer: 'Relational databases (SQL) are structured, defined by schema, and use tables. Non-relational (NoSQL) are unstructured or semi-structured, schema-less, and use key-value pairs, documents, or graphs.',
    categories: ['Databases', 'Backend'],
    company: 'Microsoft',
    difficulty: 'Medium',
    createdAt: '2023-10-15',
  },
  {
    id: '6',
    question: 'Explain Event Loop in Node.js',
    answer: 'The Event Loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded. It offloads operations to the system kernel whenever possible.',
    categories: ['Node.js', 'Backend'],
    company: 'Netflix',
    difficulty: 'Hard',
    createdAt: '2023-10-20',
  },
  {
    id: '7',
    question: 'What is TypeScript and why use it?',
    answer: 'TypeScript is a superset of JavaScript that adds static typing. It helps catch errors early, improves code readability/maintainability, and provides better IDE support.',
    categories: ['TypeScript', 'JavaScript'],
    company: 'Uber',
    difficulty: 'Easy',
    createdAt: '2023-10-22',
  },
]
