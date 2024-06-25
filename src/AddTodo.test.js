import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App'; // Adjust the path as per your project structure

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
});

test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
});

test('test that App component renders different colors for past due events', () => {
  render(<App />);
});

// No duplicate task
test('test that duplicate tasks are not added', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/30/2023";

  fireEvent.change(inputTask, { target: { value: "Test Task" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  fireEvent.change(inputTask, { target: { value: "Test Task" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const tasks = screen.getAllByText(/Test Task/i);
  expect(tasks.length).toBe(1);
});

// Submit Task with No Due Date
test('test that task with no due date is not added', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const button = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "No Due Date Task" } });
  fireEvent.click(button);

  const task = screen.queryByText(/No Due Date Task/i);
  expect(task).not.toBeInTheDocument();
});

// Submit Task with No Task Name
test('test that task with no task name is not added', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/30/2023";

  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const tasks = screen.queryAllByText(new RegExp(dueDate, "i"));
  expect(tasks.length).toBe(0);
});

// Late Tasks have Different Colors
test('test that late tasks have different colors', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const pastDueDate = "01/01/2023";

  fireEvent.change(inputTask, { target: { value: "Late Task" } });
  fireEvent.change(inputDate, { target: { value: pastDueDate } });
  fireEvent.click(button);

  const taskCard = screen.getByTestId(/Late Task/i).parentElement; // Getting the Card element
  expect(taskCard).toHaveStyle('background-color: #ffcccc');
});

// Delete Task
test('test that task is deleted', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/30/2023";

  fireEvent.change(inputTask, { target: { value: "Task to Delete" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const task = screen.queryByText(/Task to Delete/i);
  expect(task).not.toBeInTheDocument();
});

// Additional Tests (Add here)
test('additional test case', () => {
  // Example of an additional test case
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/30/2023";

  fireEvent.change(inputTask, { target: { value: "Additional Task" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(button);

  const task = screen.getByText(/Additional Task/i);
  expect(task).toBeInTheDocument();
});
