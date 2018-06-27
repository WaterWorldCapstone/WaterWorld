import React from 'react'
import Link from './Link.react'
import renderer from 'react-test-renderer'

test('Link changes class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  )

  //renders component into json I SUPPOSE
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  //Where do snapshots come from?

  //triggers mouseenter evidently
  tree.props.onMouseEnter()

  //renders current state of component to json?
  //triggers rerender?
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  //changes the ... what is tree anyway?
  tree.props.onMouseLeave()

  //this makes a rerender?
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
