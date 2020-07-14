import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
export default function ProfileScreen({navigation}) {
    const { t } = useTranslation();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [code,setCode] = useState();
    const [points,setPoints] = useState();
    const [password,setPassword] = useState();

    const [errors,setErrors] = useState({});

    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://192.168.1.2:8000/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setName(response.data.user.name);
                    setCode(response.data.user.invite_code)
                    setPoints(response.data.user.points)


                })
                .catch(function (error) {
                    alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    },[update]);
    var submit = () =>{
        AsyncStorage.getItem('token').then((token)=> {

            if ( name != '') {
                axios.post('http://192.168.1.2:8000/api/update_user', null, {
                    params: {
                        email, password, name
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(function (response) {
                        setUpdate(!update);
                        setErrors({});
                        Toast.show({
                            text: 'successfully updated your data',
                            buttonText: 'Okay',
                            type: "success"

                        })
                        // alert(JSON.stringify(response))

                    })
                    .catch(function (error) {
                        // alert(JSON.stringify(error.response))
                        setErrors(error.response.data.errors)

                    });
            }
            else {
                Toast.show({
                    text: 'please fill in all data',
                    buttonText: 'Okay',
                    type: "danger"

                })
            }
        })

    }
    var logout = ()=>{
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('type');

        navigation.navigate('Auth',{screen:'Login'});
    }

    return (
            <Container>
                <Content>

            <View style={{  alignItems: 'center'}}>
            <Image
                style={styles.stretch}
                source={require('../../Assets/Images/Group207.png')}
            />

        </View>

            <View style={styles.container}>
                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:15,
                    padding:10,
                    textAlign:'center'

                }}>{t('Points') } : {points}</Text>
                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:13,
                    padding:10,
                    textAlign:'center'
                }}>{t('to get points give this code to people to sign up with')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input  placeholder='Password' value={code} onChangeText={(value)=> null} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>

                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:12,
                    padding:10,
                    textAlign:'center'

                }}>{t('Name')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input placeholder='Name' value={name} onChangeText={(value)=>setName(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                {
                    errors.name && <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center',
                        color:'#E50000'
                    }}>{errors.name}</Text>
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
                {
                    errors.email && <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center',
                        color:'#E50000'
                    }}>{errors.email}</Text>
                }

                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:12,
                    padding:10,
                    textAlign:'center'
                }}>{t('Password')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input secureTextEntry={true} placeholder='Password' value={password} onChangeText={(value)=>setPassword(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                {
                    errors.password && <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center',
                        color:'#E50000'
                    }}>{errors.password}</Text>
                }






            </View>
                    <View style={{alignItems:'center',padding:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button
                        title="Press me"
                        onPress={() => submit()}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Save')}</Text>

                    </Button>
                        <Button
                            title="Press me"
                            onPress={() => logout()}
                            style={ styles.button }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Log Out')}</Text>

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
        justifyContent:'center',
        alignItems:'center'
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },
        margin:10,


    },
    button:{
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#FFFFFF',
        margin:10,
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});

