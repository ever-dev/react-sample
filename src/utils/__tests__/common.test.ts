import { removeNullableValues } from '../common';

describe('Common Utils', () => {
  it('`removeNullableValues` should work as expected', () => {
    expect(
      removeNullableValues({
        nonZeroNumber: 1,
        zeroNumber: 0,
        nonEmptyString: '123',
        emptyString: '',
        nullValue: null,
        undefinedValue: undefined,
      }),
    ).toEqual({
      nonZeroNumber: 1,
      zeroNumber: 0,
      nonEmptyString: '123',
    });
  });
});
