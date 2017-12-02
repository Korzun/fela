import combineMultiRules from '../combineMultiRules'

const rendererMock = {
  _mergeStyle: Object.assign,
}

describe('Combining multi rules', () => {
  it('should create a combined multi rule', () => {
    const multiRule = {
      header: props => ({
        color: 'red',
        fontSize: props.fontSize,
      }),
      content: props => ({
        lineHeight: props.lineHeight,
        padding: 10,
      })
    }

    const anotherMultiRule = {
      header: {
        backgroundColor: 'blue',
      },
      content: props => ({
        lineHeight: props.lineHeight * 2,
        padding: 20,
      })
    }

    const combinedMultiRule = combineMultiRules(multiRule, anotherMultiRule)

    expect.assertions(2)
    expect(
      combinedMultiRule.header(
        {
          fontSize: 12,
        },
        rendererMock
      )
    ).toEqual({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
    })

    expect(
      combinedMultiRule.content(
        {
          lineHeight: 10,
        },
        rendererMock
      )
    ).toEqual({
      lineHeight: 20,
      padding: 20,
    })
  })
})
