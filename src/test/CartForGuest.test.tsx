import renderer from 'react-test-renderer';
import GuestCart from '../components/CartForGuest';
import { expect, jest, test } from '@jest/globals';

type GuestCartType = {
  itemId: number;
  quantity: number;
}[];

const storageData: GuestCartType = [
  {
    itemId: 1,
    quantity: 5,
  },
];

const storage = JSON.stringify(storageData)

const noData = null;

test('ストレージなし', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(noData);
  const tree = renderer.create(<GuestCart />);
  expect(tree).toMatchSnapshot();
});

test('ストレージあり', () => {
jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(storage);
  const tree = renderer.create(<GuestCart />);
  expect(tree).toMatchSnapshot();
});
