import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Thumbnail, Text,Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from "react-i18next/src/index";
 const ReservationBox: () => React$Node = (props) => {
     const { t } = useTranslation();

     return(

    <View style={styles2.container} >
        <View style={styles2.left}>
            <Image  source={{
                uri: props.image}}
            style={{
                width:'100%',
                height:170
            }}/>

        </View>
        <View style={styles2.right}>
            <Text style={{fontFamily:'Poppins-medium',color:'#000',fontSize:13,padding:5}}>Date & Time</Text>
            <Text style={{fontFamily:'Poppins-medium',color:'#CECDCD',fontSize:11,padding:5}}>{props.date}</Text>
            <Text style={{fontFamily:'Poppins-medium',color:'#000',fontSize:13,padding:5}}>Address</Text>
            <Text style={{fontFamily:'Poppins-medium',color:'#CECDCD',fontSize:11,padding:5}}>{props.address}</Text>
            <Text style={{fontFamily:'Poppins-medium',color:'#000',fontSize:13,padding:5}}>Status</Text>
            <Text style={{fontFamily:'Poppins-medium',color:'#CECDCD',fontSize:11,padding:5}}>{props.status}</Text>


                    <Button
                        title="Press me"
                        onPress={() => alert('a')}
                        style={ styles2.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-medium',textAlign:'center',fontSize:11}}>{t('Rate')}</Text>

                    </Button>
        </View>

    </View>
)

}
const styles2 = StyleSheet.create({
container:{
flexDirection:'row',
    backgroundColor:'#fff',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    marginVertical:10,
    borderRadius:10,
    padding:10,
    elevation: 1

},
    left:{
        flex:.4,
        padding:10
    },
    right:{
        flex:.6,
        padding:5,
    },
    buttom:{
        flexDirection:'row',
        flex:1,
        justifyContent: "center",
        alignItems:'center'

    },
    stars:{
        flexDirection:'row',
        flex:1,


    },
     selectedButton: {
     backgroundColor: '#E50000',
         width:'60%',
         height:35,
         alignSelf:'flex-end',
     alignItems:'center',
         borderRadius:30,
     marginHorizontal:5,

     justifyContent:'center',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: '#E50000',
     shadowOffset: { height: 0, width: 0 },

 },



})
export default ReservationBox;