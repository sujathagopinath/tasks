// Unit testing
import { total } from './index';
// import { add, total } from './index';

const add = jest.fn(() => 5);

test('add', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(2, 5))
})

test("total", () => {
    expect(total(5, 20)).toBe('25');
})