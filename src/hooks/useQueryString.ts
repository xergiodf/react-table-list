import { useState, useCallback } from 'react'
import qs from 'query-string'

const pushQueryStringState: (value: string) => void = (value) => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${value}`
  window.history.pushState({ path: newurl }, '', newurl)
}

export const setQueryStringValue: (
  key: string,
  value: string,
  queryString?: string
) => void = (key, value, queryString = window.location.search) => {
  const qsValue = qs.stringify({
    ...qs.parse(queryString),
    [key]: value,
  })
  pushQueryStringState(`?${qsValue}`)
}

export const getQueryStringValue: (
  key: string,
  queryString?: string
) => string | string[] | null = (key, queryString = window.location.search) => {
  return qs.parse(queryString)[key]
}

function useQueryString(key: string, initialValue: any) {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue)
  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue)
      setQueryStringValue(key, newValue)
    },
    [key]
  )

  return [value, onSetValue]
}

export default useQueryString
