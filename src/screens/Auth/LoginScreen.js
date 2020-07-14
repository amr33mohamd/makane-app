import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label,Toast } from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen({route,navigation}) {
    const { t } = useTranslation();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [error,setError] = useState();
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token){
                navigation.navigate('User');
            }
        })
    },[]);
    //http://10.0.2.2:8000
    var submit = () =>{
        if(email != '' && password != '' ){
            axios.get('http://192.168.1.2:8000/api/login', {
                params: {
                    email, password
                }
            })
                .then(function (response) {
                    AsyncStorage.setItem('token',response.data.token);
                    AsyncStorage.setItem('type',''+response.data.user.type);
                    if(response.data.user.type == 1 ){
                        navigation.navigate('User');
                    }
                    else {
                        navigation.navigate('Store');
                    }
                })
                .catch(function (error) {

                    setError('Wrong email or password');

                    // alert(error.response.data.errors);
                });
        }
        else{
            Toast.show({
                text: 'please fill in all data',
                buttonText: 'Okay',
                type: "danger"

            })
        }

    }
    return (
        <Container>
            <Content>

                <View style={{  alignItems: 'center'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/login.png')}
                    />

                </View>

                <View style={styles.container}>
                    <View style={{borderBottomColor:'#000',borderBottomWidth:3,display:'flex',margin:10}}>
                        <Text style={{fontFamily:'Poppins-Medium',padding:10,fontSize:25}}>{t('Login')}</Text>
                    </View>

                    {
                        error && <Text style={{        fontFamily:'Poppins-Medium',
                            fontSize:12,
                            padding:10,
                            textAlign:'center',
                            color:'#E50000'
                        }}>{error}</Text>
                    }
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Email')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input placeholder='Email' value={email} onChangeText={(value)=>setEmail(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>


                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Password')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input secureTextEntry={true} placeholder='Password' value={password} onChangeText={(value)=>setPassword(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>




                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('SignUp')
                    }}
                                  >
                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center',

                    }}
                    >{t('New User ?')}</Text>
                    </TouchableOpacity>


                </View>
                <View style={{alignItems:'center',padding:20}}>
                    <Button
                        title="Press me"
                        onPress={() => {submit()}}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Login')}</Text>

                    </Button>
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
        resizeMode: 'stretch',


    }
});

