import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity,I18nManager,Linking} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Tab, Tabs, Thumbnail, Toast} from 'native-base';
import StoreBox from '../../components/StoreBox'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
import Carousel from 'react-native-snap-carousel';
import i18n from "i18next";
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ReviewBox from '../../components/ReviewBox'
import CouponBox from "../../components/CouponBox";
import SpecialEventBox from "../../components/SpecialEventBox";
import CalenderScreen from "./CalenderScreen";
export default function CafeScreen({route,navigation}) {
    const {t} = useTranslation();
    const [store,setStore]= useState(JSON.parse(route.params.item));
    const [normalModal,setNormalModal] = useState(false);
    const [specialModal,setSpecialModal] = useState(false);
    const [currentSpecialEvent,setCurrentSpecialEvent]= useState();
    const [selected,setSelected] = useState('view');
    var renderStars = ()=>{
        var gold = parseInt(JSON.parse(route.params.item).rating);
        var empty = 5 - parseInt(JSON.parse(route.params.item).rating);
        stars = [];
        while(gold > 0){
            gold = gold - 1;
            stars.push ( <AntDesign name="star" color="gold" size={15} style={{padding:1}}/>)
        }
        for(let m = empty;m > 0;m--){
            stars.push ( <AntDesign name="star" color="gray" size={15} style={{padding:1}}/>)
        }
        return stars;
    }
    useEffect(()=>{
        setStore(JSON.parse(route.params.item));



        // i18n.changeLanguage ('ar');
    },[]);
    var reserveNormalButton = ()=>{
        setNormalModal(true);
    }
    var reserveSpecialButton = (id)=>{
        setSpecialModal(true);
        setCurrentSpecialEvent(id);
    }


    var closeModal = ()=>{
        setNormalModal(false);
        setSpecialModal(false);
    }

    var reserveNormal = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token) {
                axios.post('http://192.168.1.2:8000/api/reserve', null, {
                    params: {
                        store_id: store.id,
                        type: 1
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {

                    closeModal()
                    Toast.show({
                        text: 'Successfully booked waiting for you ;)',
                        buttonText: 'Okay',
                        type: "success"

                    })
                    navigation.navigate('User', {screen: 'Calender', initial: false})

                }).catch((error) => {
                        closeModal()
                        if (error.response.data.err == 1) {
                            Toast.show({
                                text: 'You are banned from booking',
                                buttonText: 'Okay',
                                type: "danger"

                            });
                        }
                        else if (error.response.data.err == 2) {
                            Toast.show({
                                text: 'You already have active reservation',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                        else if (error.response.data.err == 3) {
                            Toast.show({
                                text: 'Sorry but some one got the last place',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }

                    }
                );
            }
            else{
                closeModal()
                Toast.show({
                    text: 'You need to login first',
                    buttonText: 'Okay',
                    type: "danger"

                });
            }
        })
    }

    var reserveSpecial = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            if(token) {
                axios.post('http://192.168.1.2:8000/api/reserve', null, {
                    params: {
                        store_id: store.id,
                        type: 2,
                        SpecialEvent_id: currentSpecialEvent
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    closeModal()

                    Toast.show({
                        text: 'Successfully booked waiting for you ;)',
                        buttonText: 'Okay',
                        type: "success"

                    })
                    navigation.navigate('User', {screen: 'Calender', initial: false})

                }).catch((error) => {
                        closeModal()
                        if (error.response.data.err == 1) {
                            Toast.show({
                                text: 'You are banned from booking',
                                buttonText: 'Okay',
                                type: "danger"

                            });
                        }
                        else if (error.response.data.err == 2) {
                            Toast.show({
                                text: 'You already have active reservation',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                        else if (error.response.data.err == 3) {
                            Toast.show({
                                text: 'Sorry but some one got the last place',
                                buttonText: 'Okay',
                                type: "danger"

                            })
                        }
                    }
                );
            }
            else{
                closeModal()
                Toast.show({
                    text: 'You need to login first',
                    buttonText: 'Okay',
                    type: "danger"

                });
            }
        })


    }

return (
    <ScrollView
        decelerationRate="fast"
        renderToHardwareTextureAndroid
        >

            <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={normalModal}>
                <View style={{height:270,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want to book now!')}</Text>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>{t('You can cancel your reservation 30 minutes after reserve. Note that 2 reservation without attending you will be baned')}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button
                            title="Press me"
                            onPress={() => {reserveNormal()}}
                            style={ styles.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Book Now')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {closeModal()}}
                            style={ styles.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                        </Button>

                    </View>
                </View>
            </Modal>
            <Modal animationIn="fadeIn" animationOut="fadeOut" isVisible={specialModal}>
                <View style={{height:270,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>{t('Are you sure you want to book now!')}</Text>
                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>{t('You can cancel your reservation 30 minutes after reserve. Note that 2 reservation without attending you will be baned')}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button
                            title="Press me"
                            onPress={() => {reserveSpecial()}}
                            style={ styles.modalBook }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Book Now')} </Text>

                        </Button>
                        <Button
                            title="Press me"
                            onPress={() => {closeModal()}}
                            style={ styles.modalCancel }
                        >
                            <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Cancel')} </Text>

                        </Button>

                    </View>
                </View>
            </Modal>
    <ScrollView
        renderToHardwareTextureAndroid
        horizontal={true}
        contentContainerStyle={{ width: '300%' }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        style={{position: 'absolute'}}
        decelerationRate="fast"
        pagingEnabled

    >
        {
            store.store_images.map((image)=>
                <Image renderToHardwareTextureAndroid  source={{
                    uri: 'http://192.168.1.2:8000/images/'+image.image}}
                        style={{
                            width:'33.33333%',
                            height:250,
                            resizeMode:'stretch'
                        }}/>
            )
        }



    </ScrollView>

            <View  renderToHardwareTextureAndroid style={styles.container}>
                <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:12,padding:5,alignSelf:'flex-start'}}>{store.country}</Text>

                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:28,padding:5,alignSelf:'flex-start'}}>{store.name}</Text>
                <Text style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:'#CECDCD',fontSize:12,padding:5,alignSelf:'flex-start'}}>{store.available} {t('person available')}</Text>
                <View style={{flexDirection:'row',alignItems:'flex-start',alignSelf:'flex-start',padding:10}}>
                   <Text
                       onPress={()=>
                       {
                           setSelected('view')
                       }
                       }
                       style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:(selected != 'view') ? '#CECDCD' : '#000',fontSize:12,paddingHorizontal:20,paddingTop:10,paddingBottom:15, borderBottomColor :'#E50000',borderBottomWidth: (selected == 'view') ? 1 : 0}}>
                       {t('Overview')}
                   </Text>
                    <Text
                        onPress={()=>
                        {
                            setSelected('reviews')
                        }
                        }
                        style={{fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',color:(selected != 'reviews') ? '#CECDCD' : '#000',fontSize:12,paddingHorizontal:20,paddingTop:10,borderBottomColor :'#E50000',paddingBottom:15,borderBottomWidth: (selected == 'reviews') ? 1 : 0}}>
                        {t('Reviews')}
                    </Text>
                </View>

                        {
                            (selected == 'view' ) ?
                            <View style={{alignItems:'center'}}>
                                    <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:15,padding:20}}>

                                        {(i18n.language == 'ar') ? store.description_ar : store.description_en}

                                </Text>
                                <Button
                                    onPress={ ()=> Linking.openURL('https://www.google.com/maps?q='+store.lat+','+store.lng) }
                            style= {styles.selectedButton}
                            >
                            <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',textAlign:'center',fontSize:15}}>{t('Website')}</Text>


                            </Button>
                                <View style={styles.stars}>

                                    {renderStars()}
                                </View>
                                {
                                    (store.special_events.length == 0)
                                        ?
                                        null
                                        :
                                        (<Text style={{
                                                fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',                                                color: '#000',
                                                fontSize: 20,
                                                padding: 5
                                            }}>{t('Special Events')}</Text>
                                        )
                                }


                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <FlatList
                                        style={styles.components}
                                        contentContainerStyle={{}}
                                        data={store.special_events}

                                        ListFooterComponent={()=>

                                            <Button
                                                title="Press me"
                                                onPress={() => {reserveNormalButton()}}
                                                style={ styles.selectedButton2 }
                                            >
                                                <Text style={{color:'#fff' ,fontFamily: (i18n.language == 'ar') ? 'Tajawal-Regular' :'Poppins-Medium',fontSize:12,textAlign:'center',alignSelf:'center'}}>{t('Book Now')} </Text>


                                            </Button>
                                        }
                                        renderItem={({ item }) => (



                                            <SpecialEventBox
                                                image={'http://192.168.1.2:8000/images/'+store.image}
                                                name={item.name}
                                                time={item.time}
                                                available={item.available}
                                                onPress={()=> {
                                                    reserveSpecialButton(item.id)
                                                }
                                                }
                                            />
                                        )}
                                        keyExtractor={item => item.id}
                                    />

                                </View>



                            </View>
                            :
                            (
                            <FlatList
                            style={styles.components}
                            data={store.store_reviews}
                            renderItem={({ item }) => (



                            <ReviewBox
                                image={'https://docs.nativebase.io/docs/assets/web-cover1.jpg'}
                                username={item.reviewer.name}
                                rate={item.rate}
                                review={item.review}
                            />
                        )}
                            keyExtractor={item => item.id}
                            />)

                        }




            </View>



    </ScrollView>
)

}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:200,
        textAlign:'center',
        alignItems:'center',
        padding:20,
        paddingTop:40,
        height:'100%'

    },
    searchInput:{
        width:'20%',
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
        flexDirection:'row',
        alignItems:'center',
        borderRadius:50,
width:130,
        alignSelf:'center',
        height:40,
        margin:15,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton2: {
        backgroundColor: '#E50000',
        flexDirection:'row',
alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        width:'70%',
        justifyContent:'center',
        height:45,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    selectedButton3: {
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        width:'20%',
        flex:.2,
        height:44,
        margin:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#EFEFEF',
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
    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    modalCancel:{
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderRadius:10,
        height:45,
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },
    components:{
        width:'95%'
    },
    stars:{
        flexDirection:'row',
        margin:15,
        alignSelf:'center'


    },

});