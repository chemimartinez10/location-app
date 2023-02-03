import { useState, useEffect } from "react"
import { Marker } from "react-native-maps"

function MarkerList() {
	const [lista, setlista] = useState([])
	useEffect(() => {
		;(async () => {
			try {
				const _res = await fetch(
					"https://api-location-app-production.up.railway.app/api/location"
				)
				const res = await _res.json()
				setlista(res?.data)
				console.log(lista)
			} catch (err) {
				console.log(err)
			}
		})()
	}, [])
	return lista.map(({ id, titulo, descripcion, longitud, latitud }) => (
		<Marker
			key={id}
			title={titulo}
			coordinate={{
				latitude: parseFloat(latitud),
				longitude: parseFloat(longitud),
			}}
		/>
	))
}

export default MarkerList
