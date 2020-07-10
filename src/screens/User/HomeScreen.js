import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text } from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";

export default function HomeScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('resturant');
    const [restaurants, setRestaurants ] = useState([]);
    const [cafes, setCafes ] = useState([]);
    const [currentData,setCurrentData] = useState(restaurants);
    useEffect(()=>{
        // AsyncStorage.removeItem('token');
        Geolocation.getCurrentPosition((info) => {
            var lat = info.coords.latitude;
            var lng = info.coords.latitude;

            axios.get('http://10.0.2.2:8000/api/stores', {
                params: {
                    lat, lng
                }
            })
                .then(function (response) {
                    setRestaurants(response.data.restaurants);
                    setCafes(response.data.cafes);

                    setCurrentData(response.data.restaurants);
                })
                .catch(function (error) {
                alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        })


    },[]);
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
                <Item style={styles.searchInput} rounded>
                    <Icon active name='search' style={{color:'#CECDCD'}} />
                    <Input placeholder='Search'  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                <View style={styles.buttons}>
                <Button
                    title="Press me"
                    onPress={() => {setSelected('cafe'); setCurrentData(cafes)}}
                    style={selected == 'cafe' ?  styles.selectedButton : styles.button}
                >
                    <Text style={{color:selected== 'cafe' ? '#fff' : '#000',fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('Cafe')}</Text>
                </Button>

                    <Button
                    onPress={() => {setSelected('resturant'); setCurrentData(restaurants)}}
                    style={selected == 'resturant' ?  styles.selectedButton : styles.button}
                >
                    <Text style={{color: selected== 'resturant' ? '#fff' : '#000',fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('resturants')}</Text>
                </Button>
                </View>

                    <FlatList
                        style={styles.components}
                        data={currentData}
                        renderItem={({ item }) => (
                              <TouchableOpacity onPress={()=>{
                                  navigation.navigate('CafeScreen',{item:JSON.stringify(item)})
                              }}
                                                activeOpacity={.95}
                                                >

                            <StoreBox
                                name={item.name}
                                description={item.description_en}
                                image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                                available={item.available}
                                rate={item.rating}
                            />
                              </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />




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

