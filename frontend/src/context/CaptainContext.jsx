import { createContext, useContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
	const [captain, setCaptain] = useState(null)

	return (
		<CaptainDataContext.Provider value={{ captain, setCaptain }}>
			{children}
		</CaptainDataContext.Provider>
	)
}

export const useCaptain = () => useContext(CaptainDataContext)

export default CaptainContext
