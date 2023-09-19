import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styled'

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={{
          fontSize: 20
        }}>Veges</Text>
        <Image 
          style={styles.image} 
          source={require('../../assets/person_1.jpg')}
        />
      </View>
    </View>
  )
}

export default Dashboard
