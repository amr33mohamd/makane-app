import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Spinner } from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import  StatusBarPlaceHolder from '../../components/StatusBarPlaceHolder'

import Feather from 'react-native-vector-icons/Feather';
import i18n from "i18next/index";

export default function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('resturant');
    const [restaurants, setRestaurants ] = useState([]);
    const [cafes, setCafes ] = useState([]);
    const [currentData,setCurrentData] = useState(restaurants);
    const [search,setSearch] = useState();
    const [update,setUpdate] = useState();
    const [featched,setFeatched] = useState(false);
    useEffect(()=>{
        // AsyncStorage.removeItem('token');
        Geolocation.getCurrentPosition((info) => {
            var lat = info.coords.latitude;
            var lng = info.coords.latitude;

            axios.get('http://192.168.1.2:8000/api/stores', {
                params: {
                    lat, lng,search
                }
            })
                .then(function (response) {
                    setFeatched(true);

                    setRestaurants(response.data.restaurants);
                    setCafes(response.data.cafes);
                    setCurrentData(response.data.restaurants);
                })
                .catch(function (error) {


                    // alert(error.response.data.errors);
                });
        })


    },[update]);
    return (
            <Container>
                <Content>


                    <View  style={{    position: 'absolute',height:220,width:'100%',justifyContent:'flex-start',flexDirection:'column'}}>
            <Image
                style={styles.stretch}
                source={require('../../Assets/Images/test.jpg')}
                style={{resizeMode:'cover',height:'100%',width:'100%'}}
            />

        </View>
            <View renderToHardwareTextureAndroid style={styles.container}>
                <Item style={styles.searchInput} rounded>
                    <Feather active name='search' size={20} style={{color:'#CECDCD'}} />
                    <Input placeholder={t('Search')} value={search} onChangeText={(value)=>{setSearch(value)}} onSubmitEditing={()=>{setUpdate(!update)}} fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                <View  style={styles.buttons}>
                <Button
                    title="Press me"
                    onPress={() => {setSelected('cafe'); setCurrentData(cafes)}}
                    style={selected == 'cafe' ?  styles.selectedButton : styles.button}
                >
                    <Text style={{color:selected== 'cafe' ? '#fff' : '#000',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Cafe')}</Text>
                </Button>

                    <Button
                    onPress={() => {setSelected('resturant'); setCurrentData(restaurants)}}
                    style={selected == 'resturant' ?  styles.selectedButton : styles.button}
                >
                    <Text style={{color: selected== 'resturant' ? '#fff' : '#000',fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('resturants')}</Text>
                </Button>
                </View>
                {
                    (featched) ?
                        <FlatList
                            renderToHardwareTextureAndroid
                            style={styles.components}
                            data={currentData}
                            ListEmptyComponent={()=>
                                <Text style={{color:  '#000',fontFamily:'Poppins-Medium',textAlign:'center',fontSize:15}}>No Data</Text>
                            }
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate('CafeScreen',{item:JSON.stringify(item)})
                                }}
                                                  activeOpacity={.95}
                                >

                                    <StoreBox
                                        name={item.name}
                                        description={item.description_en}
                                        image={'http://192.168.1.2:8000/images/'+item.image}
                                        available={item.available}
                                        rate={item.rating}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Spinner color='#E50000'/>
                }





            </View>
                </Content>

            </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:190,
        textAlign:'center',
        alignItems:'center'
    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        marginTop:35,
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        flex: .4,
        alignItems:'center',
        borderRadius:50,
        marginHorizontal:5,

        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    button:{
        backgroundColor: '#FFFFFF',
        color: '#ffffff',
        flex: .4,
        marginHorizontal:5,
        borderColor:'#fff',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    }
});

