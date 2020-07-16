import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container, Header, Content, Thumbnail, Text, Button, Item, Input, Toast} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

import {useTranslation} from "react-i18next/src/index";
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
 const ReservationBox: () => React$Node = (props) => {
     const { t } = useTranslation();
     const [cancelModal,setCancelModal] = useState(false);
     const [reviewModal,setReviewModal] = useState(false);
    const [stars,setStars] = useState(5);
    const  [review,setReview] = useState();
     var rate = ()=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://10.0.2.2:8000/api/user-review',null, {
                params:{
                  store_id:props.store_id,
                  reservation_id:props.id,
                  review,
                  stars
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Thanks for your review',
                        buttonText: 'Okay',
                        type: "success"

                    });
                    props.navigation.navigate('User',{screen:'Home',  initial: false})


                })
                .catch(function (error) {
                    alert(JSON.stringify(error))

                    // alert(error.response.data.errors);
                });
        });
    }
     return(

    <View style={styles2.container} >
        <Modal animationIn="fadeIn"  isVisible={cancelModal}>
            <View style={{height:190,backgroundColor:'#fff',padding:10,borderRadius:20}}>
                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>Are you sure you want cancel now!</Text>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <Button
                        title="Press me"
                        onPress={() => {setCancelModal(false)}}
                        style={ styles2.modalCancel }
                    >
                        <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('skip')} </Text>

                    </Button>
                    <Button
                        title="Press me"
                        onPress={() => {props.cancel();setCancelModal(false)}}
                        style={ styles2.modalBook }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                    </Button>


                </View>
            </View>
        </Modal>
        <Modal animationIn="fadeIn"  isVisible={reviewModal}>
            <View style={{height:260,backgroundColor:'#fff',padding:10,borderRadius:20,alignItems:'center'}}>
                <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:20,paddingHorizontal:20,paddingTop:20}}>Rate Us!</Text>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    fullStarColor={'gold'}
                    containerStyle={{width:'50%',alignSelf:'center',justifyContent:'center',margin:15}}
                    halfStarEnabled={false}
                    rating={stars}
                    selectedStar={(rating) => setStars(rating)}
                />
                <Item style={styles2.searchInput} rounded >

                    <Input placeholder='Review' style={{textAlign:'center'}}
                           value={review}
                           onChangeText={(value)=>{setReview(value)}}
                           fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>
                <View style={{flexDirection:'row',justifyContent:'center'}}>

                    <Button
                        title="Press me"
                        onPress={() => {setReviewModal(false)}}
                        style={ styles2.modalCancel }
                    >
                        <Text style={{color:'#000' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('cancel')} </Text>

                    </Button>
                    <Button
                        title="Press me"
                        onPress={() => {rate();setReviewModal(false)}}
                        style={ styles2.modalBook }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:12,textAlign:'center'}}>{t('Confirm')} </Text>

                    </Button>


                </View>
            </View>
        </Modal>
        <View style={styles2.left}>
            <Image  source={{
                uri: props.image}}
            style={{
                width:'100%',
                height:170
            }}/>

        </View>
        <View style={styles2.right}>
            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5}}>Date & Time</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5}}>{props.date}</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5}}>Address</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5}}>{props.address}</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#000',fontSize:13,padding:5}}>Status</Text>
            <Text style={{fontFamily:'Poppins-Medium',color:'#CECDCD',fontSize:11,padding:5}}>{(props.status == 0) ? 'comming' : (props.status == 1)  ? 'done' : (props.status == 2) ? 'ignored' : 'canceled'}</Text>
            {
                (props.status == 0)?
                    (props.type == 1) ?
                    (Math.abs(moment(props.date,'h:mm a').diff(moment(),'minutes')) > 30 )

                ? null
                        : <Button
                            title="Press me"
                            onPress={() => setCancelModal(true)}
                            style={ styles2.selectedButton }
                        >
                            <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Cancel')}</Text>

                        </Button>
                        :
                        (Math.abs(moment(props.date,'h:mm a').diff(moment(),'minutes')) < 30 )

                            ? null
                            : <Button
                                title="Press me"
                                onPress={() => setCancelModal(true)}
                                style={ styles2.selectedButton }
                            >
                                <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Cancel')}</Text>

                            </Button>

                    :(props.status == 1 && props.clientReview == false) ?
                    <Button
                        title="Press me"
                        onPress={() => setReviewModal(true)}
                        style={ styles2.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-Medium',textAlign:'center',fontSize:11}}>{t('Rate')}</Text>

                    </Button>
                    :null
            }

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
    width:'98%'

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
    modalCancel:{
        backgroundColor: '#EFEFEF',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        justifyContent:'center',
        width:90,
        shadowColor: '#EFEFEF',
        shadowOffset: { height: 0, width: 0 },

    },

    modalBook:{
        backgroundColor: '#E50000',
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:10,
        height:45,
        width:95,
        justifyContent:'center',
        marginHorizontal:15,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin:20,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },



})
export default ReservationBox;