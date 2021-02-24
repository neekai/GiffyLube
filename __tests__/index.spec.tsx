import { shallow } from 'enzyme'
import Home from '../src/pages/index'
import Trending from '../src/pages/trending'
import Favorites from '../src/pages/favorites'
import Main from '../src/components/Main'
import Starred from '../src/components/Starred'
import Gallery from '../src/components/Gallery'

describe('Pages', () => {
  describe('Home', () => {
    it('should render the Home component without error', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.find(Main)).toHaveLength(1)
    })
  })

  // describe('Trending', () => {
  //   it('should render the Gallery component without error', () => {
  //     const wrapper = shallow(<Trending />)
  //     expect(wrapper.find(Gallery)).toHaveLength(1)
  //   })
  // })

  describe('Favorites', () => {
    it('should render the Starred component without error', () => {
      const wrapper = shallow(<Favorites />)
      expect(wrapper.find(Starred)).toHaveLength(1)
    })
  })
})
