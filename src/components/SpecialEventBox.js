import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert,I18nManager} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Thumbnail, Text,Button } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import moment from "moment";
import {useTranslation} from "react-i18next/src/index";
const SpecialEventBox: () => React$Node = (props) => {
    const { t } = useTranslation();

    return(

        <View style={styles2.container} >
            <View style={styles2.left}>
                <Image  source={{
                    uri: props.image}}
                        style={{
                            width:'100%',
                            height:70
                        }}/>

            </View>
            <View style={styles2.right}>
                <Text style={{fontFamily:'Poppins-medium',color:'#000',fontSize:13,padding:5}}>{props.name}</Text>
                <Text style={{fontFamily:'Poppins-medium',color:'#CECDCD',fontSize:11,padding:5}}>{moment(props.time,'hh:mm:ss').calendar() }</Text>


                <Button
                    title="Press me"
                    onPress={()=>{
                        props.onPress()
                    }}
                    style={ styles2.selectedButton }
                >
                    <Text style={{color:'#fff' ,fontFamily:'Poppins-medium',textAlign:'center',fontSize:11}}>{t('book')}</Text>

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
        elevation: 1,
        width:'95%',
        alignSelf:'center'

    },
    left:{
        flex:.4,
        padding:10
    },
    right:{
        flex:.7,
        justifyContent:'flex-end'
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
        justifyContent:'flex-end',
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
export default SpecialEventBox;