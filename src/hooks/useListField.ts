// hooks/useListField.ts
import { useCallback, useState } from 'react'

interface Options {
  max?: number
  min?: number
}

/**
 * 通用的"可增删改的列表"状态。
 * createEmpty 必须是稳定引用（定义在组件外面）。
 */
export function useListField<T extends object>(
  initial: T[],
  createEmpty: () => T,
  { max = Infinity, min = 0 }: Options = {}
) {
  const [items, setItems] = useState<T[]>(initial)

  const add = useCallback(
    () => setItems((prev) => (prev.length >= max ? prev : [...prev, createEmpty()])),
    [max, createEmpty]
  )

  const remove = useCallback(
    (index: number) =>
      setItems((prev) => (prev.length <= min ? prev : prev.filter((_, i) => i !== index))),
    [min]
  )

  // 字段名和值类型由 T 推导，写错字段名会直接报错
  const update = useCallback(
    <K extends keyof T>(index: number, field: K, value: T[K]) =>
      setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it))),
    []
  )

  return {
    items,
    setItems,
    add,
    remove,
    update,
    canAdd: items.length < max,
    canRemove: items.length > min,
  }
}
