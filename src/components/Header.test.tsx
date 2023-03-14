import renderer from 'react-test-renderer';
import Header from './Header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
    useRouter() {
      return {
        push: jest.fn(),
      };
    },
  }));

test('未ログイン', () => {
  const tree = renderer.create(<Header auth={false} />);
  expect(tree).toMatchSnapshot();
});

test('ログイン時', () => {
    const tree = renderer.create(<Header auth={true} />);
    expect(tree).toMatchSnapshot();
  });
