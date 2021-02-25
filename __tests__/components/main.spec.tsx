import { mount, shallow } from 'enzyme'
import { act } from '@testing-library/react'
import * as FilterContext from '../../src/contexts/FilterContext'
import * as DelayContext from '../../src/contexts/DelayContext'
import * as apiCalls from '../../src/services/getGIFs'
import Main from '../../src/components/views/Main'
import Search from '../../src/components/common/Search'
import RandomGIF from '../../src/components/views/RandomGIF'
import NoResults from '../../src/components/common/NoResults'
import Loading from '../../src/components/common/Loading'

describe('Main', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            data: { images: { original: { url: '' } }, slug: '', url: '' }
          })
        }
      })
    )
  })

  const filterContextValues = {
    setFilter: () => null,
    filterState: { query: '' }
  }

  const delayContextValues = { delayState: { delay: 0 } }
  jest
    .spyOn(FilterContext, 'useFilterContext')
    .mockImplementation(() => filterContextValues)
  jest
    .spyOn(DelayContext, 'useDelayContext')
    .mockImplementation(() => delayContextValues)

  const apiFunc = jest
    .spyOn(apiCalls, 'getRandomGIF')
    .mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            data: { images: { original: { url: '' } }, slug: '', url: '' }
          })
        }
      })
    })

  it('handles async useEffect', async () => {
    const component = mount(<Main />)
    expect(component.find('button')).toHaveLength(0)

    await act(async () => {
      await Promise.resolve(component)
      await new Promise(resolve => setImmediate(resolve))
      expect(component.find(Loading)).toBeTruthy()
      component.update()
    })
    expect(component.find('section').length).toBe(1)
    expect(component.contains(<Loading />)).toBe(false)
  })

  it('should render the Loading component on initial loading', () => {
    const component = shallow(<Main />)
    expect(component.contains(<Loading />)).toBe(true)
  })

  it('should contain the Search component', () => {
    const component = shallow(<Main />)
    expect(component.find(Search)).toBeTruthy()
  })

  it('should contain the RandomGIF component', () => {
    const component = shallow(<Main />)
    expect(component.find(RandomGIF)).toBeTruthy()
  })

  it('should contain the NoResults component', () => {
    const component = shallow(<Main />)
    expect(component.find(NoResults)).toBeTruthy()
  })

  it('should contain a button', () => {
    const component = shallow(<Main />)
    expect(component.find('button')).toBeTruthy()
  })
})
