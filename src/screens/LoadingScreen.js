import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoadingScreen({route,navigation}) {
    const { t } = useTranslation();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [error,setError] = useState();
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                navigation.navigate('User');
            }
            else {
                navigation.navigate('Auth');

            }
        })
    },[]);

    return (
        <Container>
            <Content>

                <View style={{  alignItems: 'center'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../Assets/Images/splash.png')}
                    />

                </View>


            </Content>

        </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        borderRadius:40,
        textAlign:'left',
        alignItems:'center',
        alignSelf:'center'
    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },

    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'contain',


    }
});

