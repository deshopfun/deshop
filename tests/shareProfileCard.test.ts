import { describe, expect, it } from 'vitest'
import { SHARE_CARD_H, SHARE_CARD_THEMES, SHARE_CARD_W } from '@/utils/shareProfileCard'

describe('shareProfileCard constants', () => {
  it('exposes stable canvas dimensions and themes', () => {
    expect(SHARE_CARD_W).toBe(1080)
    expect(SHARE_CARD_H).toBe(1400)
    expect(SHARE_CARD_THEMES.map((t) => t.id)).toEqual(['sky', 'emerald', 'sunset', 'night'])
  })
})
