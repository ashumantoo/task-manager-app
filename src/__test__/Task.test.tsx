import { render, screen } from '@testing-library/react';
import { Task } from '../task/task';

test("Render the task component with a create task button", () => {
  render(<Task />);
  const createButton = screen.getByText('Add Task');
  expect(createButton).toBeInTheDocument();
})

test("Test should be options to filter the task", () => {
  render(<Task />);
  const selectEle = screen.getByTestId('filterByStatus');
  expect(selectEle).toBeInTheDocument();
})

test("Render task table", () => {
  render(<Task />);
  const selectEle = screen.getByTestId('taskTable');
  expect(selectEle).toBeInTheDocument();
});

// test("Render create task dialog", () => {
//   render(<Task />);
//   const createTaskEle = screen.getByText('Add New Task');
//   expect(createTaskEle).toBeInTheDocument();
// });