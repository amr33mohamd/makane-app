import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Label, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
export default  function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [code,setCode] = useState();
    const [points,setPoints] = useState();
    const [description_ar,setDescriptionAr] = useState();
    const [description_en,setDescriptionEn] = useState();
    const [password,setPassword] = useState();
    const [available,setAvailable] = useState();
    const [errors,setErrors] = useState({});
    const [persons,setPersons] = useState();
    const [update,setUpdate] = useState(false);
    useEffect(()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://10.0.2.2:8000/api/user',null, {

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    setName(response.data.user.name);
                    setCode(response.data.user.invite_code)
                    setPoints(response.data.user.points)
                    setDescriptionAr(response.data.user.description_ar)
                     setDescriptionEn(response.data.user.description_en)
                    setPersons(response.data.user.available)
                })
                .catch(function (error) {
                    // alert(JSON.stringify(error))

                    // alert(error);
                });
        });
    },[update]);
    var submit = (available2) =>{
        AsyncStorage.getItem('token').then((token)=> {

            if ( name != '') {
                axios.post('http://10.0.2.2:8000/api/update_user', null, {
                    params: {
                        email, password, name,description_ar,description_en,
                        available:(available2 != null) ? available2 : persons
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
                        alert(JSON.stringify(error.response))
                        // setErrors(error.response.data.errors)

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
        navigation.navigate('Auth',{screen:'Login'});
    }

    return (
        <Container>
            <Content>

                <View style={{  alignItems: 'center',  position: 'absolute'}}>
                    <Image
                        style={styles.stretch}
                        source={require('../../Assets/Images/Header.png')}
                        style={{height:250}}
                    />

                </View>
                <View style={styles.container}>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'

                    }}>{t('available')}</Text>
                    <Item style={styles.searchInput} rounded >

                        <Input
                            placeholder='Available'
                            value={''+persons}
                            onChangeText={
                                 (value)=>{
                                   setPersons(value);
                                       submit(value);


                                }
                            }
                            style={{textAlign:'center'}}
                            fontFamily='Poppins-ExtraLight'
                            fontSize={15}
                            placeholderTextColor="#CECDCD"
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
                    }}>{t('Description Arabic')}</Text>
                    <Item style={[styles.searchInput,{height:150}]} rounded >

                        <Input placeholder='Description' value={description_ar} onChangeText={(value)=>setDescriptionAr(value)}
                               multiline = {true}
                               numberOfLines = {4}
                               style={{textAlign:'center',height:150}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                        />
                    </Item>

                    <Text style={{        fontFamily:'Poppins-Medium',
                        fontSize:12,
                        padding:10,
                        textAlign:'center'
                    }}>{t('Description English')}</Text>
                    <Item style={[styles.searchInput,{height:150}]} rounded >

                        <Input
                            multiline = {true}
                            numberOfLines = {4}
                            placeholder='Description' value={description_en} onChangeText={(value)=>setDescriptionEn(value)} style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
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
                        onPress={() => submit(null)}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('Save')}</Text>

                    </Button>

                </View>
            </Content>

        </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:200,
        textAlign:'center',
        alignItems:'center',
        padding:20,

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

