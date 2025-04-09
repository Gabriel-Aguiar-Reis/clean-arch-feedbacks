import { Feedback } from '@/domain/entities/feedback.entity'

describe('Feedback Entity', () => {
  it('should create feedback with valid properties', () => {
    const feedback = new Feedback(1, 'Muito bom!', 5, 10)

    expect(feedback.id).toBe(1)
    expect(feedback.comment).toBe('Muito bom!')
    expect(feedback.rating).toBe(5)
    expect(feedback.userId).toBe(10)
  })
})
