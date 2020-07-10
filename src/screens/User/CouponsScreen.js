import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useTranslation } from 'react-i18next';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Toast} from 'native-base';
import CouponBox from '../../components/CouponBox'
import axios from "axios/index";
import AsyncStorage from "@react-native-community/async-storage";
export default function CouponScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('coupons');
    const [coupons, setCoupons ] = useState([]);
    const [owned, setOwned ] = useState([]);
    const [currentData,setCurrentData] = useState(coupons);
    const [update,setUpdate] = useState(false);
    const [redirect,setRedirect] = useState(false);
    useEffect(()=>{
    AsyncStorage.getItem('token').then((token)=>{
        axios.post('http://10.0.2.2:8000/api/coupons',null, {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                setCoupons(response.data.coupons);
                setOwned(response.data.owned_coupons);

                if(redirect == true){
                    setSelected('owned');
                    setCurrentData(response.data.owned_coupons);

                }
                else {
                    setSelected('coupons');
                    setCurrentData(response.data.coupons);

                }
            })
            .catch(function (error) {
                alert(JSON.stringify(error))

                // alert(error.response.data.errors);
            });
    });
    },[update]);

    var buy_coupon = (id)=>{
        AsyncStorage.getItem('token').then((token)=>{
            axios.post('http://10.0.2.2:8000/api/buy_coupon',null, {
                params:{
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Toast.show({
                        text: 'Successfully bought the coupon',
                        buttonText: 'Okay',
                        type: "success"

                    });
                    setRedirect(true);

                    setUpdate(!update);


                })
                .catch(function (error) {
                    if(error.response.data.err == 1){
                        Toast.show({
                            text: "You don't have enough balance",
                            buttonText: 'Okay',
                            type: "danger"

                        });
                    }
                });
        });
    }

    return (
        <Container>
            <Content>


                <View style={styles.container}>
                    <View style={styles.buttons}>
                        <Button
                            title="Press me"
                            onPress={() => {setSelected('coupons');setCurrentData(coupons)}}
                            style={selected == 'coupons' ?  styles.selectedButton : styles.button}
                        >
                            <Text style={{color:selected== 'coupons' ? '#fff' : '#000',fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('Coupons')}</Text>
                        </Button>

                        <Button
                            onPress={() => {setSelected('owned');setCurrentData(owned)}}
                            style={selected == 'owned' ?  styles.selectedButton : styles.button}
                        >
                            <Text style={{color: selected== 'owned' ? '#fff' : '#000',fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('Owned')}</Text>
                        </Button>
                    </View>

                    <FlatList
                        style={styles.components}
                        data={currentData}
                        renderItem={({ item }) => (


                                <CouponBox
                                    percent={(item.percent) ? item.percent :item.coupon.percent }
                                    price={(item.price) ? item.price :item.coupon.price }
                                    type={selected}
                                    code={(item.code) ? item.code :item.coupon.code }
                                    id={item.id}
                                    buy_coupon={()=>{buy_coupon(item.id)}}
                                    image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                                />
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
        marginTop:'10%',
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

