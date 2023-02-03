import { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import * as Location from "expo-location"
import MapView from "react-native-maps"
import MarkerList from "./src/components/MarkerList"

export default function App() {
	const [location, setLocation] = useState(null)
	const [press, setPress] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				setErrorMsg("El permiso a la localizacion ha sido denegado")
				return
			}
			let location = await Location.getCurrentPositionAsync({})
			setLocation(location)
		})()
	}, [])
	const updatePress = (e) => {
		e.persist()
		setPress(e?.nativeEvent?.coordinate)
		console.log(press)
	}

	return (
		<View style={styles.container}>
			{location ? (
				<>
					<MapView
						onLongPress={updatePress}
						style={styles.map}
						initialRegion={{
							latitude: location?.coords?.latitude || 37.78825,
							longitude: location?.coords?.longitude || -122.4324,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						<MarkerList/>
					</MapView>
					
				</>
			) : (
				<Text style={styles.overlay}>{errorMsg || "Cargando mapas..."}</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		position:"relative",
	},
	map: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		position:"absolute",
		flex:1,
		justifyContent: "center",
		alignItems:"center",
		width:"100%",
		height:"100%",
		backgroundColor:"#0005"
	},
})
