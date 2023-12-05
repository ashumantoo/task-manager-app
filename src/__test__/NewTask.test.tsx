import { render, screen } from '@testing-library/react';
import { TaskDialog } from '../task/task-dialog';
import userEvent from '@testing-library/user-event';

test("Render the task component with a create task button", () => {
  const mockHadleClose = jest.fn();
  const mochHanleSubmit = jest.fn();
  render(
    <TaskDialog
      open={true}
      handleClose={mockHadleClose}
      handleSubmit={mochHanleSubmit}
      taskId=''
    />);
  userEvent.click(screen.getByTestId('closeicon'));
  expect(mockHadleClose).toHaveBeenCalled();
})

test("Render new task title input", () => {
  const mockHadleClose = jest.fn();
  const mochHanleSubmit = jest.fn();
  render(
    <TaskDialog
      open={true}
      handleClose={mockHadleClose}
      handleSubmit={mochHanleSubmit}
      taskId=''
    />);
  const titleElement = screen.getByPlaceholderText('Enter title');
  expect(titleElement).toBeInTheDocument();
})

test("Render new task description input", () => {
  const mockHadleClose = jest.fn();
  const mochHanleSubmit = jest.fn();
  render(
    <TaskDialog
      open={true}
      handleClose={mockHadleClose}
      handleSubmit={mochHanleSubmit}
      taskId=''
    />);
  const titleElement = screen.getByPlaceholderText('Enter description');
  expect(titleElement).toBeInTheDocument();
});

test("Render new task status options", () => {
  const mockHadleClose = jest.fn();
  const mochHanleSubmit = jest.fn();
  render(
    <TaskDialog
      open={true}
      handleClose={mockHadleClose}
      handleSubmit={mochHanleSubmit}
      taskId=''
    />);
  const titleElement = screen.getByTestId('createtaskselect');
  expect(titleElement).toBeInTheDocument();
});

test("Render new task submit button", () => {
  const mockHadleClose = jest.fn();
  const mochHanleSubmit = jest.fn();
  render(
    <TaskDialog
      open={true}
      handleClose={mockHadleClose}
      handleSubmit={mochHanleSubmit}
      taskId=''
    />);
  const titleElement = screen.getByTestId('tasksubmit');
  expect(titleElement).toBeInTheDocument();
});