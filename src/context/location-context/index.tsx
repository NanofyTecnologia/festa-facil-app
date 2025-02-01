'use client'

import {
  useState,
  createContext,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react'

type LocationProps = {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

const LocationContext = createContext<LocationProps>({
  location: '',
  setLocation: () => {},
})

export function LocationProvider({ children }: PropsWithChildren) {
  const [location, setLocation] = useState('')

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)

  if (!context) {
    throw new Error(
      'useSelectedLocation needs to be used within LocationProvider',
    )
  }

  return context
}
