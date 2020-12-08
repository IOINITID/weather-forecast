import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../loader/loader';

describe(`Loader component`, () => {
  it(`Loader component should render correctly`, () => {
    const tree = renderer.create(<Loader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
